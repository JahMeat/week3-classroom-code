const express = require('express')
const app = express()
const port = 3001

var indexRouter = require('./routes/index');
var carsRouter = require('./routes/cars');
var landRouter = require('./routes/v2/land');

// Run with 'node app.js'
// See output with curl (in new terminal tab) or browser at http://localhost:3000/
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// Using express.Router to create mountable route handlers.
// https://expressjs.com/en/guide/routing.html
app.use('/', indexRouter);
app.use('/cars', carsRouter);
app.use('/v2/land', landRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})