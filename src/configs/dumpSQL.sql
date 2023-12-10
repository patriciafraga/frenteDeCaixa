CREATE DATABASE pdv;

DROP table IF Exists usuarios;
create table usuarios(
	  id 			SERIAL PRIMARY KEY,
  	nome 		TEXT NOT NULL,
  	email 		TEXT NOT NULL unique,
  	senha		TEXT NOT NULL
);

DROP table IF Exists categorias;
create table categorias(
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL
);

INSERT INTO categorias
(descricao)
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

DROP table IF Exists produtos;
create table produtos(
	  id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id)
);

DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes (
  id SERIAL NOT NULL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf TEXT NOT NULL UNIQUE,
  cep INTEGER,
  rua TEXT,
  numero INTEGER,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
);

DROP TABLE IF EXISTS pedidos;
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  observacao TEXT,
  valor_total INTEGER
);

DROP TABLE IF EXISTS pedido_produtos;
CREATE TABLE pedido_produtos (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER
);

ALTER TABLE produtos ADD COLUMN produto_imagem TEXT;
