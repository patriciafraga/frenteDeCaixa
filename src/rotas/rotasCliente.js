const express = require("express");
const rotas = express();
rotas.use(express.json());

const controladorCadastrarCliente = require("../controladores/clientes/controladorCadastrarCliente");
const controladorAtualizarCliente = require("../controladores/clientes/controladorAtualizarCliente");
const controladorListarCliente = require("../controladores/clientes/controladorListarCliente");
const { autenticacao } = require("../intermediarios/autenticacao");
const schemaCliente = require("../validacoes/schemaCliente");

const {
  validarReqParams,
  validarReqBody,
} = require("../intermediarios/validarRequisicao");
const {
  validarParametro,
  verificarIdEmBranco,
} = require("../intermediarios/validarParametro");
const idParamSchema = require("../validacoes/schemaReqParams");

rotas.use(autenticacao);

rotas.post(
  "/cliente",
  validarReqBody(schemaCliente),
  controladorCadastrarCliente
);
rotas.post(
  "/cliente",
  validarReqBody(schemaCliente),
  controladorCadastrarCliente
);
rotas.get("/cliente", controladorListarCliente);
rotas.get("/cliente/:id", validarReqParams(idParamSchema), controladorListarCliente);

rotas.put("/cliente", verificarIdEmBranco);
rotas.put(
  "/cliente/:id",
  validarReqParams(idParamSchema),
  validarReqBody(schemaCliente),
  controladorAtualizarCliente
);
module.exports = rotas;
