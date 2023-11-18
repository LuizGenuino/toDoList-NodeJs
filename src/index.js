const express = require('express');
const routes = require('./routes');
const {errorMiddleware} = require('./middlewares/error')
const cors = require('cors');

require('dotenv').config()

require('./database')

const app = express();

app.use(cors());

app.use(express.json())
app.use(routes)

app.use(errorMiddleware)


  

app.listen(3333);