const knex = require("../../configs/knex");

const controladorListarPedido = async (req, res) => {
  const { filtro } = req.query;
  const cliente_id = Number(filtro);
  try {
    if (!filtro) {
      const pedidosListados = await knex("pedidos")
        .select("*")
        .select(
          knex.raw(
            "(SELECT SUM(valor_produto * quantidade_produto) FROM pedido_produtos WHERE pedido_produtos.pedido_id = pedidos.id) as valor_total"
          )
        );
      return res.status(200).json(pedidosListados);
    } else if (isNaN(cliente_id) || cliente_id <= 0) {
      return res
        .status(400)
        .json({ mensagem: "O id do cliente precisa ser um número positivo!" });
    } else {
      const pedidosListadosPorIdCliente = await knex("pedidos")
        .join("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
        .where({ cliente_id: cliente_id })
        .select(
          "pedidos.id as pedido_id",
          "pedidos.valor_total",
          "pedidos.observacao",
          "pedidos.cliente_id",
          "pedido_produtos.id",
          "pedido_produtos.quantidade_produto",
          "pedido_produtos.valor_produto",
          "pedido_produtos.pedido_id",
          "pedido_produtos.produto_id"
        )
        .returning("*");

      if (!pedidosListadosPorIdCliente.length) {
        return res.status(404).json({ mensagem: `Cliente não encontrado!` });
      }

      const resultadosAgrupados = pedidosListadosPorIdCliente.reduce(
        (agrupado, resultado) => {
          const pedidoExistente = agrupado.find(
            (item) => item.pedido.id === resultado.pedido_id
          );

          if (pedidoExistente) {
            pedidoExistente.pedido_produtos.push({
              id: resultado.id,
              quantidade_produto: resultado.quantidade_produto,
              valor_produto: resultado.valor_produto,
              pedido_id: resultado.pedido_id,
              produto_id: resultado.produto_id,
            });
          } else {
            agrupado.push({
              pedido: {
                id: resultado.pedido_id,
                valor_total: resultado.valor_total,
                observacao: resultado.observacao,
                cliente_id: resultado.cliente_id,
              },
              pedido_produtos: [
                {
                  id: resultado.id,
                  quantidade_produto: resultado.quantidade_produto,
                  valor_produto: resultado.valor_produto,
                  pedido_id: resultado.pedido_id,
                  produto_id: resultado.produto_id,
                },
              ],
            });
          }

          return agrupado;
        },
        []
      );

      return res.status(200).json(resultadosAgrupados);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const controladorListarPedidoPorId = (req, res) => {
  const { id } = req.params;
  if (id) {
    return res.status(400).json({
      mensagem: `Para listar pedido por id do cliente, favor incluir query params na pesquisa.`,
    });
  }
};

module.exports = { controladorListarPedido, controladorListarPedidoPorId };
