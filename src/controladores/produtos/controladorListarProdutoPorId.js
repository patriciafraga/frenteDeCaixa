const knex = require("../../configs/knex");

const controladorListarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoListadoPorId = await knex("produtos")
      .where({ id })
      .returning("*");
    if (produtoListadoPorId.length === 0) {
      return res.status(404).json({ mensagem: `Produto não cadastrado!` });
    }
    return res.status(200).json(produtoListadoPorId);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
module.exports = controladorListarProdutoPorId;
