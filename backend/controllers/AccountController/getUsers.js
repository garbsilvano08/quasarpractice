const express           = require('express');
const bodyParser        = require('body-parser');
const MDB_USERS         = require('../../models/MDB_USERS');

const app               = express();
const jsonParser        = bodyParser.json();

app.post('/', jsonParser, async (req, res) => {
    try {
        const users     = new MDB_USERS();
        const userRes   = await users.docs();
        res.json(userRes).status(200);
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }
});

module.exports = app;