//import express from 'express';

const express= require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  console.log('who ask me? ')
  return res.send('hello world!')  
})

app.listen(5000, () => {
  console.log('server listen on 5000')
})