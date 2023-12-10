const express = require("express");
const rotas = express();
rotas.use(express.json());

const controladorCadastrarUsuario = require("../controladores/usuarios/controladorCadastrarUsuario");
const login = require("../controladores/usuarios/login");
const controladorAtualizarUsuario = require("../controladores/usuarios/controladorAtualizarUsuario");
const { obterPerfil, autenticacao } = require("../intermediarios/autenticacao");
const { validarReqBody } = require("../intermediarios/validarRequisicao");

const schemaUsuario = require("../validacoes/schemaUsuario");
const schemaLogin = require("../validacoes/schemaLogin");

rotas.post(
  "/usuario",
  validarReqBody(schemaUsuario),
  controladorCadastrarUsuario
);
rotas.post("/login", validarReqBody(schemaLogin), login);

rotas.use(autenticacao);

rotas.get("/usuario", obterPerfil);
rotas.put(
  "/usuario",
  validarReqBody(schemaUsuario),
  controladorAtualizarUsuario
);

module.exports = rotas;
