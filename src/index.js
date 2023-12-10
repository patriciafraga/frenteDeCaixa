require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const rotasCategoria = require('./rotas/rotasCategoria');
const rotasCliente = require('./rotas/rotasCliente');
const rotasProduto = require('./rotas/rotasProduto');
const rotasUsuario = require('./rotas/rotasUsuario');
const rotasPedido = require('./rotas/rotasPedido');

app.use(express.json());
app.use(cors());
app.use(rotasCategoria);
app.use(rotasUsuario);
app.use(rotasCliente);
app.use(rotasProduto);
app.use(rotasPedido);



app.listen(port, () => console.log(`Rodando em https://pdvcubos.cyclic.app`));
