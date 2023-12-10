const knex = require("../../configs/knex");

async function controladorListarCategorias(req, res) {
  try {
    const result = await knex.select().from("categorias");
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = controladorListarCategorias;
