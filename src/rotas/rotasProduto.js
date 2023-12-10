const express = require("express");
const rotas = express();
rotas.use(express.json());
const multer = require("../intermediarios/multer");

const controladorCadastrarProduto = require("../controladores/produtos/controladorCadastrarProduto");
const controladorListarProduto = require("../controladores/produtos/controladorListarProduto");
const controladorListarProdutoPorId = require("../controladores/produtos/controladorListarProdutoPorId");
const controladorAtualizarProduto = require("../controladores/produtos/controladorAtualizarProduto");
const controladorExcluirProduto = require("../controladores/produtos/controladorExcluirProduto");

const { autenticacao } = require("../intermediarios/autenticacao");
const {
  validarReqBody,
  validarReqParams,
} = require("../intermediarios/validarRequisicao");

const { verificarIdEmBranco } = require("../intermediarios/validarParametro");
const idParamSchema = require("../validacoes/schemaReqParams");
const schemaProduto = require("../validacoes/schemaProduto");

rotas.use(autenticacao);

rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  validarReqBody(schemaProduto),
  controladorCadastrarProduto
);
rotas.get("/produto", controladorListarProduto);
rotas.get(
  "/produto/:id",
  validarReqParams(idParamSchema),
  controladorListarProdutoPorId
);

rotas.put("/produto", verificarIdEmBranco);
rotas.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  validarReqParams(idParamSchema),
  validarReqBody(schemaProduto),
  controladorAtualizarProduto
);

rotas.delete("/produto", verificarIdEmBranco);
rotas.delete(
  "/produto/:id",
  multer.single("produto_imagem"),
  validarReqParams(idParamSchema),
  controladorExcluirProduto
);

module.exports = rotas;
