const express = require('express');
const routes = require('./routes');
const {errorMiddleware} = require('./middlewares/error')
require('dotenv').config()

require('./database')

const app = express();

app.use(express.json())
app.use(routes)

app.use(errorMiddleware)


  

app.listen(3333);