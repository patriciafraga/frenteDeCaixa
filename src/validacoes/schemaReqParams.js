const joi = require("joi");
const idParamSchema = joi.object({
  id: joi.number().integer().positive().required().messages({
    "any.required": "O campo id é obrigatório!",
    "number.integer": "O campo id precisa ser um número inteiro!",
    "number.positive": "O campo id precisa ser maior que zero!",
    "number.base": "O campo id necessita ser numérico",
    "any.empty": "O campo id não pode estar vazio!",
  }),
});
module.exports = idParamSchema;
