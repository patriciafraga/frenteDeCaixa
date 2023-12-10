const knex = require("../../configs/knex");

const controladorAtualizarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  if (!req.params) {
    return res
      .status(400)
      .json({ mensagem: `Obrigatório informar o [id] para esta operação!` });
  }
  const { id } = req.params;
  try {
    if (id) {
      const clienteCadastrado = await knex("clientes").where({ id }).first();
      console.log(clienteCadastrado);
      if (!clienteCadastrado) {
        return res.status(404).json({ mensagem: `cliente não encontrado!` });
      }
      const emailExistente = await knex("clientes")
        .where({ email })
        .andWhere("id", "<>", id)
        .first();
      if (emailExistente) {
        return res.status(404).json({ mensagem: `Email já cadastrado!` });
      }
      const cpfExistente = await knex("clientes")
        .where({ cpf })
        .andWhere("id", "<>", id)
        .first();
      if (cpfExistente) {
        return res.status(404).json({ mensagem: `CPF já cadastrado!` });
      }
      const clienteAlterado = await knex("clientes")
        .where({ id })
        .update({
          nome,
          email,
          cpf,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
        })
        .returning("*");

      return res.status(200).json(clienteAlterado);
    }
    return res
      .status(400)
      .json({ mensagem: `Obrigatório informar o [id] para esta operação!` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: `Erro interno do servidor!` });
  }
};
module.exports = controladorAtualizarCliente;
