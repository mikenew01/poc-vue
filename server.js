const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB');

const itemRoutes = require('./expressRoutes/itemRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => { 
        console.log('Banco de dados conectado') 
    },
    err => { 
        console.log('Nao foi possivel conectar a base de dados' + err) 
    }
);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('/items', itemRoutes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Executando na porta: ' + port);
});