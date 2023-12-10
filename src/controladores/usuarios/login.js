const knex = require('../../configs/knex');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  const { email, senha } = req.body;

    try {
        const usuario = await knex("usuarios").where({ email: email });

        if (!usuario.length) {
            return res.status(400).json({ message: "Email ou senha invalidos" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario[0].senha);
        if (!senhaValida) {
            return res.status(400).json({ message: "Email ou senha invalidos" });
        }
        const { senha: _, ...usuarioLogado } = usuario[0];

        const token = jwt.sign({ id: usuarioLogado.id }, process.env.PRIVATE_KEY, { expiresIn: "8h", });

        return res.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};
module.exports = login;
