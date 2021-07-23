require('dotenv').config();

console.log(process.env);

const express = require('express');
const apiRouter = require('./app/routers/api');
const websiteRouter = require('./app/routers/website');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// Body parser
app.use(express.json());

// Routage
app.use('/api', apiRouter);
app.use('/', websiteRouter);

const port = process.env.PORT || 3000;

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});