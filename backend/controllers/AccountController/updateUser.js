const express           = require('express');
const bodyParser        = require('body-parser');
const MDB_USERS         = require('../../models/MDB_USERS');

const app               = express();
const jsonParser        = bodyParser.json();

app.put('/', jsonParser, async (req, res) => {
    try {

        const user_id   = req.body.id;

        delete req.body['id'];

        const update    = req.body;


        const users     = new MDB_USERS();
        const userRes   = await users.update(user_id, update);
        res.json(userRes).status(200);
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }
});

module.exports = app;