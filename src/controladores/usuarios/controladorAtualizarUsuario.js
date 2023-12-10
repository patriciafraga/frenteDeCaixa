const knex = require("../../configs/knex");
const { hash } = require("bcrypt");
const { randomInt } = require("node:crypto");

const controladorAtualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.perfilUsuario;

  try {
    const consultaUsuario = await knex("usuarios")
      .where("email", email)
      .andWhere("id", "<>", id)
      .returning("*");

    if (consultaUsuario.length > 0)
      return res
        .status(400)
        .json({ mensagem: `Já exite usuário cadastrado com este email!` });

    const salt = randomInt(7, 10);
    const senhaBcrypt = await hash(senha, salt);

    const usuarioAlterado = await knex("usuarios")
      .where({ id: id })
      .update({
        nome,
        email,
        senha: senhaBcrypt,
      })
      .returning("*");

    const { senha: segredo, ...dadosCadastrados } = usuarioAlterado[0];

    return res.status(200).json(dadosCadastrados);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};
module.exports = controladorAtualizarUsuario;
