const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório.",
    "string.email": "O campo email deve ser um endereço de email válido.",
    "string.empty": "O email não pode estar vazio!",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.min": "O campo senha não pode ter menos que 5 caracteres.",
    "string.base": "O campo senha deve ser uma string!",
    "string.empty": "O campo senha não pode estar vazio!",
  }),
});
module.exports = schemaLogin;
