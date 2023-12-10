const knex = require("../../configs/knex");

const controladorListarProduto = async (req, res) => {
  const { filtro } = req.query;
  console.log(filtro, typeof filtro);
  try {
    if (!filtro) {
      const produtosListados = await knex("produtos").returning("*");
      return res.status(200).json(produtosListados);
    } else if (isNaN(filtro) || filtro <= 0) {
      return res
        .status(400)
        .json({ mensagem: "O id do cliente precisa ser um número positivo!" });
    } else {
      const categoria_id = Number(filtro);
      console.log(categoria_id, typeof categoria_id);
      const produtosListadosPorCat = await knex("produtos")
        .where({ categoria_id: categoria_id })
        .returning("*");
      if (!produtosListadosPorCat.length) {
        return res.status(404).json({ mensagem: `Categoria não encontrada!` });
      }
      return res.status(200).json(produtosListadosPorCat);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
module.exports = controladorListarProduto;
