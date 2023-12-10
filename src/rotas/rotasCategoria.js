const express = require("express");
const rotas = express();
rotas.use(express.json());
const controladorListarCategorias = require("../controladores/categorias/controladorListarCategorias");

rotas.get("/categoria", controladorListarCategorias);

module.exports = rotas;
