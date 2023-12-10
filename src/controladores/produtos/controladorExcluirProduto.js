const knex = require("../../configs/knex");
const s3 = require("../../configs/bucket");
const bucketImagem = require("./controladorbucketImagem.js");

const controladorExcluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoCadastrado = await knex("produtos").where({ id: id }).first();
    if (!produtoCadastrado) {
      return res.status(404).json({ mensagem: `Produto não cadastrado!` });
    }
    const produtoPedido = await knex("pedido_produtos")
      .where({ produto_id: id })
      .first();
    if (produtoPedido) {
      return res.status(404).json({
        mensagem: `Produto não pode ser removido, pois consta em um pedido!`,
      });
    }
    const consultarImagem = await knex("produtos")
      .where({ id })
      .select("produto_imagem")
      .first();
    console.log(consultarImagem);
    if (!consultarImagem || consultarImagem.produto_imagem === null) {
      await knex("produtos").where({ id }).del();
      return res
        .status(200)
        .json({ mensagem: `Produto excluído com sucesso!` });
    }

    const imagemKey = consultarImagem.produto_imagem.split("/").pop();
    await bucketImagem.excluir(`imagens/${imagemKey}`);

    await knex("produtos").where({ id }).del();
    return res.status(200).json({ mensagem: `Produto excluído com sucesso!` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: `Erro interno do servidor!` });
  }
};
module.exports = controladorExcluirProduto;
