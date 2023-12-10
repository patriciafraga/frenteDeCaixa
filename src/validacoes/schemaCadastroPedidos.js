const joi = require("joi");

const schemaPedido = joi.object({
  cliente_id: joi.number().integer().min(1).required().messages({
    "any.required": "O campo cliente_id é obrigatório!",
    "number.integer": "O campo cliente_id precisa ser um número inteiro!",
    "number.min": "O campo cliente_id precisa ser maior que zero!",
    "number.base": "O campo id necessita ser numérico",
    "any.empty": "O campo id não pode estar vazio!",
  }),
  observacao: joi.string().allow(""),
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().integer().min(1).required().messages({
          "any.required": "O campo produto_id é obrigatório!",
          "number.integer": "O campo produto_id precisa ser um número inteiro!",
          "number.min": "O campo produto_id precisa ser maior que zero!",
          "number.base": "O campo produto_id necessita ser numérico",
          "any.empty": "O campo produto_id não pode estar vazio!",
        }),
        quantidade_produto: joi.number().integer().min(1).required().messages({
          "any.required": "O campo quantidade_produto é obrigatório!",
          "number.integer":
            "O campo quantidade_produto precisa ser um número inteiro!",
          "number.min":
            "O campo quantidade_produto precisa ser maior que zero!",
          "number.base": "O campo quantidade necessita ser numérico",
          "any.empty": "O campo quantidade não pode estar vazio!",
        }),
        valor_produto: joi.number().integer().min(1).allow().messages({
          "number.base": "O valor deve ser numérico!",
          "number.integer":
            "O campo valor_produto precisa ser um número inteiro!",
          "number.min": "O campo valor_produto precisa ser maior que zero!",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "O campo pedido_produtos é obrigatório!",
      "array.base": "Este campo deve ser um array de pedidos",
      "array.empty": "Cada pedido deve ter, ao menos, um produto cadastrado!",
      "array.min": "O array de pedido_produtos não deve estar vazio!",
    }),
});
module.exports = schemaPedido;
