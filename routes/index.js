const express = require('express');
const router = express.Router();
const ctrl = require('../controller');
var {logger} = require('../utils/logger')
const uidgen = require('uuid/v4');

router.post('/readbykey',  async (req, res) => {
    let result = await ctrl.readByKey(req.body);

    let requestId = uidgen().substring(0, 5);

    logger.info(`[${requestId}] Method:${req.method} URL:${req.url} RequestBody: ${maskPassword(req.body)}`)

    res.status(result.code).send(result);

    logger.info(`[${requestId}] ResponseBody:${maskPassword(result.data)} `)
})

router.post('/readall',  async (req, res) => {
    let result = await ctrl.readAll(req.body);

    let requestId = uidgen().substring(0, 5);

    logger.info(`[${requestId}] Method:${req.method} URL:${req.url} RequestBody: ${maskPassword(req.body)}`)

    res.status(result.code).send(result);

    logger.info(`[${requestId}] ResponseBody:${maskPassword(result.data)} `)
})

module.exports = router;
