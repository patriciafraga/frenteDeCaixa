const knex = require("../../configs/knex.js");
const bucketImagem = require("./controladorbucketImagem.js");

const controladorAtualizarProduto = async (req, res) => {
  const id = Number(req.params.id);
  console.log(id, typeof id);
  const { file } = req;
  try {
    let produtoImagem = null;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    if (file) {
      const imagemResposta = await bucketImagem.enviar(req, res);
      produtoImagem = imagemResposta.url;
    }
    const produtoCadastrado = await knex("produtos").where({ id: id }).first();
    if (!produtoCadastrado || produtoCadastrado.length === 0) {
      return res.status(404).json({ mensagem: `Produto não encontrado!` });
    }
    console.log(produtoCadastrado);
    const categoriaValida = await knex("categorias")
      .where({ id: categoria_id })
      .first();
    if (!categoriaValida) {
      return res.status(404).json({ mensagem: `Categoria inválida!` });
    }
    const produtoAlterado = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: produtoImagem,
      })
      .returning("*");

    return res.status(200).json(produtoAlterado);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: `Erro interno do servidor!` });
  }
};
module.exports = controladorAtualizarProduto;
