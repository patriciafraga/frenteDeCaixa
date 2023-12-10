const knex = require('../../configs/knex');
const bcrypt = require('bcrypt');

require('dotenv').config();

async function controladorCadastrarUsuario (req, res) {
    const { nome, email, senha } = req.body;

    try {

        const usuarioExistente = await knex("usuarios").where({ email: email });
        if (usuarioExistente.length) {
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex("usuarios").insert({
            nome: nome,
            email: email,
            senha: senhaHash,
        }).returning('*');
        
        delete novoUsuario[0].senha;
        return res.status(201).json(novoUsuario[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = controladorCadastrarUsuario;
