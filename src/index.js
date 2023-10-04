const express = require('express');
const routes = require('./routes');
const error = require('./middlewares/error')

require('./database')

const app = express();

app.use(express.json())
app.use(routes)

app.use(error.errorMiddleware)

app.listen(3333);