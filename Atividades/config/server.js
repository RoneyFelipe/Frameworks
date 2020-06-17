var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser'); //Importação do módulo BodyParser
var expressValidator = require('express-validator'); //Importação do módulo expressValidator

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({ extended: true }));
//Aqui parametrizamos como o bodyParser vai tratar os formulários.
//O parametro extend:true vai permitir que seja implementada através de Json (Ou seja, implementação por meio do JSON).
//Passamos a possuir url codificadas.
app.use(expressValidator()); //Execução do expressValidator.

consign()
    .include('app/routes')
    .then('config/dbConnection.js') //Incluido a conexão com o banco por meio do consign.
    .then('app/models') //Inclui o diretório de models.
    .into(app);
//O consign reconhece todos os arquivos da pasta routes (Escaneamento/analise), obtendo os módulos e
//incluindo dentro do servidor - app. 

module.exports = app; //Retornando a variável app