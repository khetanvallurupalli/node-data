const express = require('express');
const helmet = require('helmet');
const uidgen = require('uuid/v4');
const bodyParser = require('body-parser');
var app = express();
var route = require('./routes');
require('./db');
const {logger} = require('./utils/logger');
app.use(helmet())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {

    if (!req.body.databaseType)
        return res.status(200).send({
            code: 200,
            message: `Mandatory field 'databaseType' is missing`,
            data: null,
            err: ''
        })

    if (!req.body.databaseName)
        return res.status(200).send({
            code: 200,
            message: `Mandatory field 'databaseName' is missing`,
            data: null,
            err: ''
        })

    if (['psql'].indexOf(req.body.databaseType) < 0) {
        return res.status(200).send({
            code: 200,
            message: `Database not supported`,
            data: null,
            err: ''
        })
    }

    if (!req.body.tableName)
        return res.status(200).send({
            code: 200,
            message: `Mandatory field 'tableName' is missing`,
            data: null,
            err: ''
        })


    next()
})



app.use('/v1/database', route);



app.listen(3006, () => {
    logger.info(`Server is up on port 3006`)
})
