const knex = require("../../configs/knex");

async function controladorCadastrarCliente (req, res) {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const emailExistente = await knex("clientes")
      .where({ email })
      .first();
    console.log(emailExistente);
    if (emailExistente) {
      return res
        .status(404)
        .json({ message: "Este email já está cadastrado." });
    }
    const cpfExistente = await knex("clientes").where({ cpf: cpf }).first();
    console.log(cpfExistente);
    if (cpfExistente) {
      return res.status(404).json({ message: "Este CPF já está cadastrado." });
    }
    const novoCliente = await knex("clientes")
      .insert({
        nome: nome,
        email: email,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      })
      .returning("*");
    return res.status(201).json(novoCliente);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = controladorCadastrarCliente;
