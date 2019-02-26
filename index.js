const express= require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const util = require('util')
const path = require('path')
const fs = require('fs')

const app = express()
//const upload = util.promisify( multer({ dest : 'images/' }))
const upload = multer({ dest : 'images/' })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

// app.use('/images', express.static(publicImagesPath))


app.get('/', (req, res) => {
  console.log('who ask me? ')
  return res.send('hello world!')  
})

app.post('/photos/upload', upload.single('newFile'),(req,res,next) => {
  if (!req.file) {
    console.log('request post fail', req.file)
    return res.send('request fail')
  }
  const newFile = req.file
  console.log('request post', req.file)
  return res.send('request receive!') 
})

app.get('/photos', (req,res,next) => {
 fs.readdir('images',(err,files) => {
  console.log('FILES GET : ',files)
  res.sendFile(__dirname+'/images/fac65ee74ab0ea6daef4e41490c1030d')
 })
})


app.listen(5000, () => {
  console.log('server listen on 5000')
})