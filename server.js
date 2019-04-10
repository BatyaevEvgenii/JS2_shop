// import express, { static } from 'express';
const express = require('express');

// import fs from 'fs';
const fs = require('fs');

const bodyParser = require('body-parser');

const app = express(); // подключаем express

// какая директория хранит статику
app.use(express.static('./public'));

// подключение к express
app.use(bodyParser.json());

// обрабатываем GET запрос
app.get('/catalogdata', (req, res) => {
  // res.send('kalajdlks');
  // грузим наши данные из файла товаров
  fs.readFile('./db/catalogData.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    res.send(data);
  });

});

app.get('/getbasket', (req, res) => {
  // res.send('kalajdlks');
  // грузим наши данные из файла товаров
  fs.readFile('./db/getBasket.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    res.send(data);
  });

});

//  для передачи данных метом POST необходим модуль body-parser, его поставили
app.post('/getbasket', (req, res) => {
  fs.readFile('./db/getBasket.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    const basket = JSON.parse(data);
    basket.push(req.body);

    fs.writeFile('./db/getBasket.json', JSON.stringify(basket), (err) => {
      if(err) {
        console.log(err);

      }
      res.send(req.body);
    });
  });
});

// метод patch
app.patch('/getbasket/:id', (req, res) => {
  fs.readFile('./db/getBasket.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    let basket = JSON.parse(data);
    basket = basket.map((good) => {
      if(good.id === +req.params.id) {
        return { ...good, ...req.body };
      }
      return good;
    });

    fs.writeFile('./db/getBasket.json', JSON.stringify(basket), (err) => {
      if(err) {
        return console.log(err);
      }
      res.send(basket.find((good) => good.id === +req.params.id));
    });
  });
});

// прослушиваем порт
app.listen(3000, () => {
  console.log('Server has been started!');
});