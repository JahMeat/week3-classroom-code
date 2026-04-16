var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  console.log("get /v2/land")

  res.status(204).send();
  next()
})

module.exports = router;