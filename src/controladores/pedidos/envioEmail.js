const compilerHtml = require("../../utils/compilador");
const transport = require("../../configs/configsEmail");
require("dotenv").config();

const envioEmail = async (req, res) => {
  try {
    const readerHtml = await compilerHtml(
      "./src/templates/emailConfirmacao.html"
    );

    transport.sendMail({
      from: `${process.env.TRAP_NAME} <${process.env.TRAP_FROM}>`,
      to: `${process.env.TRAP_FROM}`,
      subject: "Confirmação de pedido!",
      html: readerHtml,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = envioEmail;
