const express = require("express");
const rotas = express();
const controladorCadastrarPedido = require("../controladores/pedidos/controladorCadastrarPedido");
const { validarReqBody } = require("../intermediarios/validarRequisicao");
const schemaPedido = require("../validacoes/schemaCadastroPedidos");
const {
  controladorListarPedido,
  controladorListarPedidoPorId,
} = require("../controladores/pedidos/controladorListarPedido");

rotas.use(express.json());

rotas.post("/pedido", validarReqBody(schemaPedido), controladorCadastrarPedido);
rotas.get("/pedido", controladorListarPedido);
rotas.get("/pedido/:id", controladorListarPedidoPorId);

module.exports = rotas;
