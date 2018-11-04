const fs = require('fs')
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const path = __dirname + '/files'

app.use(express.json())
app.use(express.urlencoded())

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('static'))

const main = require('./app/main')(app, fs, path)

app.listen(80)
