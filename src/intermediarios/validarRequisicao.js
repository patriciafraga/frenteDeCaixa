const validarReqBody = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body, { messages: {} });
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ mensagem: error.message });
  }
};


const validarReqParams = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.params, { messages: {} });
    
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  validarReqBody,
  validarReqParams
};
