const jwt = require("jsonwebtoken");
const knex = require("../configs/knex");

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
  const tokenHeader = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(tokenHeader, process.env.PRIVATE_KEY);

    const usuarioAutenticado = await knex("usuarios")
      .select("id", "nome", "email", "senha")
      .where({ id })
      .returning("*");

    const { senha: segredo, ...dadosUsuario } = usuarioAutenticado[0];
    req.perfilUsuario = dadosUsuario;

    if (usuarioAutenticado.length === 0) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

const obterPerfil = (req, res) => {
  return res.json(req.perfilUsuario);
};

module.exports = {
  autenticacao,
  obterPerfil,
};
