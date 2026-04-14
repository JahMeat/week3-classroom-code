var express = require('express');
var router = express.Router();
const carData = require('../data/cars.json')

router.get('/', (req, res) => {
  res.send(carData[0])
})

module.exports = router;
