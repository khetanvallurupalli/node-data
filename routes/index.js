const express = require('express');
const router = express.Router();
const ctrl = require('../controller');
var {logger} = require('../utils/logger')
const uidgen = require('uuid/v4');

router.post('/insert',  async (req, res) => {
    let result = await ctrl.insert(req.body);

    let requestId = uidgen().substring(0, 5);


    res.status(result.code).send(result);

})

router.post('/readall',  async (req, res) => {
    let result = await ctrl.readAll(req.body);

    let requestId = uidgen().substring(0, 5);


    res.status(result.code).send(result);

})

module.exports = router;
