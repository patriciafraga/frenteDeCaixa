const joi = require("joi");

const schemaCliente = joi.object({
  nome: joi
    .string()
    .required()
    .messages({
      "any.required": "O campo nome é obrigatório!",
      "string.base": "O campo nome deve ser uma string!",
      "string.empty": "O nome não pode estar vazio!",
    }),
  email: joi.string().required().email().messages({
    "any.required": "O campo email é obrigatório.",
    "string.email": "O campo email deve ser um endereço de email válido.",
    "string.empty": "O email não pode estar vazio!",
  }),
  cpf: joi.string().required().min(9).max(11).messages({
    "any.required": "O campo CPF é obrigatório.",
    "string.empty": "O CPF não pode estar vazio!",
    "string.base": "O campo CPF deve ser uma string!",
    "string.min": "O campo CPF deve ser válido (min 9 - max 11 caracteres).",
    "string.max": "O campo CPF deve ser válido (min 9 - max 11 caracteres).",
  }),
  cep: joi.number().integer().positive().min(5).messages({
    "number.base": "O campo CEP deve ser um número!",
    "number.min": "O campo CEP deve conter, no mínimo, 5 dígitos numéricos !",
    "number.integer": "O campo CEP precisa ser um número inteiro.",
    "number.positive": "Digite um número válido/positivo.",
  }),
  rua: joi.string().messages({
    "string.base": "O campo rua deve ser uma string!",
  }),
  numero: joi.number().integer().min(0).messages({
    "number.base": "Este campo precisa ser numérico!",
    "number.integer": "O campo número precisa ser um número inteiro.",
    "number.min": "Digite um número positivo",
  }),
  bairro: joi.string().messages({
    "string.base": "O campo bairro deve ser uma string!",
  }),
  cidade: joi.string().messages({
    "string.base": "O campo cidade deve ser uma string!",
  }),
  estado: joi.string().messages({
    "string.base": "O campo estado deve ser uma string!",
  }),
});
module.exports = schemaCliente;
