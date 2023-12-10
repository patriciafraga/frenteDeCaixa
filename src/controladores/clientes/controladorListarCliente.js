const knex = require("../../configs/knex");

const controladorListarCliente = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (id) {
      const clienteListadoPorId = await knex("clientes")
        .where({ id })
        .returning("*");
        console.log(clienteListadoPorId);
      if (clienteListadoPorId.length === 0 || !clienteListadoPorId ) {
        return res.status(404).json({
          mensagem: `Cliente não encontrado, favor digitar [id] válido!`,
        });
      }
      return res.status(200).json(clienteListadoPorId);
    }
    const clientesListados = await knex("clientes").returning("*");
    return res.status(200).json(clientesListados);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
module.exports = controladorListarCliente;
