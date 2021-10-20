// itemRoutes.js

const { response } = require('express');
var express = require('express');
var app = express();
var itemRoutes = express.Router();
const Item = require('../models/Item');

itemRoutes.route('/add').post(function (req, res) {
  const item = new Item(req.body);

  item.save()
    .then(item => {
      const resposta = {
        code: 200,
        data: item,
        message: "Item adicionado com sucesso",
        erros: []
      };

      res.status(200).json(resposta);
    })
    .catch(err => {
      const resposta = {
        code: 400,
        data: null,
        message: 'Não foi possível salvar registor na base de dados',
        erros: [
          {
            code: 400,
            message: err
          }
        ]
      };

      res.status(400).json(resposta);
    });
});

itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      const resposta = {
        code: 200,
        data: items,
        message: "Items consultados com sucesso",
        erros: []
      };

      res.status(200).json(resposta);
    }
  });
});

itemRoutes.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;

  Item.findById(id, function (err, item) {

    const resposta = {
      code: 201,
      data: item,
      message: "Item editado com sucesso",
      erros: []
    };

    res.status(201).json(resposta);
  });
});

itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function (err, item) {
    if (!item)
      return next(new Error('Não foi possível carregar o item'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
        const resposta = {
          code: 201,
          data: item,
          message: "Item atualizado com sucesso",
          erros: []
        };

        res.status(201).json(resposta);
      })
        .catch(err => {
          const resposta = {
            code: 400,
            data: null,
            message: "Não foi possível atualizar o registro",
            erros: [
              {
                code: 400,
                message: err
              }
            ]
          };

          res.status(400).json(resposta);
        });
    }
  });
});

itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({ _id: req.params.id }, function (err, item) {
    if (err) {
      res.json(err);
    } else {
      const resposta = {
        code: 200,
        data: item,
        message: "Item removido com sucesso",
        erros: []
      };

      res.json(resposta);
    }
  });
});

module.exports = itemRoutes;