const joi = require("joi");

const schemaProduto = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório!",
    "string.base": "O campo descrição deve ser uma string!",
    "string.empty": "O campo descrição não pode estar vazio!",
  }),
  quantidade_estoque: joi.number().integer().greater(0).required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório!",
    "number.integer":
      "O campo quantidade_estoque precisa ser um número inteiro!",
    "number.greater": "O campo quantidade_estoque precisa ser maior que zero!",
    "number.base": "O campo quantidade necessita ser numérico",
    "any.empty": "O campo quantidade_estoque não pode estar vazio!",
  }),
  valor: joi.number().integer().greater(0).required().messages({
    "any.required": "O campo valor é obrigatório!",
    "number.base": "O valor deve ser numérico!",
    "number.integer": "O campo valor precisa ser um número inteiro!",
    "number.greater": "O campo valor precisa ser maior que zero!",
    "any.empty": "O campo valor não pode estar vazio!",
  }),
  categoria_id: joi.number().integer().positive().required().messages({
    "any.required": "O campo categoria_id é obrigatório!",
    "number.integer": "O campo categoria_id precisa ser um número inteiro!",
    "number.positive": "O campo categoria_id precisa ser maior que zero!",
    "number.base": "O campo categoria_id necessita ser numérico",
    "any.empty": "O campo categoria_id não pode estar vazio!",
  }),
  produto_imagem: joi.string().uri().messages({
    "string.base": "O campo produto_imagem deve ser uma string!",
    "string.uri": "O endereço da imagem deve ser válido!",
  }),
});
module.exports = schemaProduto;
