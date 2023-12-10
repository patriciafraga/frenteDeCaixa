const knex = require("../../configs/knex");
const envioEmail = require("./envioEmail");

const controladorCadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  try {
    const clienteExistente = await knex("clientes").whereIn("id", [cliente_id]);
    if (!clienteExistente || clienteExistente.length === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }

    const produtoIds = pedido_produtos.map((produto) => produto.produto_id);
    const produtosDisponiveis = await knex("produtos")
      .whereIn("id", produtoIds)
      .select("id", "quantidade_estoque", "valor");

    const produtosEncontrados = [];
    let valorTotal = 0;

    for (const produto of pedido_produtos) {
      const produtoDisponivel = produtosDisponiveis.find(
        (p) => p.id === produto.produto_id
      );

      if (!produtoDisponivel) {
        throw new Error(`Produto ${produto.produto_id} não encontrado!`);
      }

      const quantidadeDisponivel = produtoDisponivel.quantidade_estoque;
      const quantidadeSolicitada = produto.quantidade_produto;

      if (quantidadeSolicitada > quantidadeDisponivel) {
        return res.status(400).json({
          mensagem: `Produto ${produto.produto_id} com quantidade insuficiente em estoque!`,
        });
      }

      const valor_produto =
        produto.valor_produto !== undefined && produto.valor_produto !== null
          ? produto.valor_produto
          : produtoDisponivel.valor;

      valorTotal += valor_produto * quantidadeSolicitada;

      produtosEncontrados.push({
        produto_id: produto.produto_id,
        quantidade_produto: quantidadeSolicitada,
        valor_produto: valor_produto,
      });
    }
    const novoPedido = await knex("pedidos")
      .insert({
        cliente_id: cliente_id,
        observacao: observacao,
      })
      .returning("*");

    const pedidoProdutosInseridos = await Promise.all(
      produtosEncontrados.map(async (produto) => {
        const pedidoProdutoInserido = await knex("pedido_produtos")
          .insert({
            pedido_id: novoPedido[0].id,
            produto_id: produto.produto_id,
            quantidade_produto: produto.quantidade_produto,
            valor_produto: produto.valor_produto,
          })
          .returning("*");
        return pedidoProdutoInserido[0];
      })
    );

    const retorno = {
      cliente_id,
      observacao,
      valor_total: pedidoProdutosInseridos.reduce(
        (total, produto) =>
          total + produto.valor_produto * produto.quantidade_produto,
        0
      ),
      pedido_produtos: pedidoProdutosInseridos,
      mensagem: "Pedido cadastrado com sucesso! E-mail de confirmação enviado.",
    };

    await knex("pedidos")
      .where({ id: novoPedido[0].id })
      .update({ valor_total: retorno.valor_total });

    await envioEmail(req, res);
    res.status(201).json(retorno);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = controladorCadastrarPedido;
