const express = require('express')
const app = express()
const port = 3000

var indexRouter = require('./routes/index');
var carsRouter = require('./routes/cars');

// Run with 'node app.js'
// See output with curl (in new terminal tab) or browser at http://localhost:3000/

// Using express.Router to create mountable route handlers.
// https://expressjs.com/en/guide/routing.html
app.use('/', indexRouter);
app.use('/cars', carsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})