const nodemailer = require("nodemailer");
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: process.env.TRAP_HOST,
    port: process.env.TRAP_PORT,
    auth: {
      user: process.env.TRAP_USER,
      pass: process.env.TRAP_PASS
    }
  });

module.exports= transport;