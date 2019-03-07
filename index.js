const express= require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const util = require('util')
const path = require('path')
const fs = require('fs')

const app = express()
//const upload = util.promisify( multer({ dest : 'public/' }))
const upload = multer({ dest : 'public/' })
const publicDirectory = path.join(__dirname, '/public')
let jsonData = fs.readFileSync('./mock/indexImages.json', 'utf8');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('who ask me? ')
  return res.send('hello world!')  
})

app.post('/photos/upload', upload.single('newFile'),(req,res,next) => {
  if (!req.file) {
    return res.send('request fail')
  }
  const newFile = req.file
  let jsonParsedata = JSON.parse(jsonData);
  let newUrl = {url: req.file.filename};
  jsonParsedata.push(newUrl)
  fs.writeFile('./mock/indexImages.json',JSON.stringify(jsonParsedata, null, '\t'), 'utf8',(resJson) =>{
    return res.send('request receive!') 
})
})

app.get('/photos', (req,res,next) => { // not use
 fs.readdir('public',(err,files) => {
  console.log('FILES GET : ',files)
  console.log('dirname : ', __dirname+'/public/fac65ee74ab0ea6daef4e41490c1030d.jpg')
  res.sendFile(__dirname+'/public/fac65ee74ab0ea6daef4e41490c1030d.jpg')
 })
})

app.get('/url', (req, res, next) => {
  console.log('jsondata ', jsonData)
  res.json(jsonData)
})


app.listen(5000, () => {
  console.log('server listen on 5000 ', jsonData)
})