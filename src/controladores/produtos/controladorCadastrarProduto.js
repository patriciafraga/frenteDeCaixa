const knex = require("../../configs/knex");
const bucketImagem = require("./controladorbucketImagem");

const controladorCadastrarProduto = async (req, res) => {
  const { file } = req;
  try {
    let produtoImagem = null;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    if (file) {
      const imagemResposta = await bucketImagem.enviar(req, res);
      produtoImagem = imagemResposta.url;
    }

    const categoriaValida = await knex("categorias")
      .where("id", Number(categoria_id))
      .first();
    if (!categoriaValida) {
      return res.status(404).json({ mensagem: `Categoria inválida!` });
    }

    const produtoCadastrado = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: produtoImagem,
      })
      .returning("*");

    return res.status(201).json(produtoCadastrado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: `Erro interno do servidor!` });
  }
};

module.exports = controladorCadastrarProduto;
