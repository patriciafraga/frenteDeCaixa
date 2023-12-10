const verificarIdEmBranco = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, typeof id);
  if (!id) {
    return res
      .status(400)
      .json({
        mensagem: `É obrigatório digitar um [id] válido para esta operação!`,
      });
  }
  next();
};

module.exports = {
  verificarIdEmBranco,
};
