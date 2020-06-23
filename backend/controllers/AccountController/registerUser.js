const express           = require('express');
const bodyParser        = require('body-parser');
const MDB_USERS         = require('../../models/MDB_USERS');

const app               = express();
const jsonParser        = bodyParser.json();

app.post('/', jsonParser, async (req, res) => {
    try {
        /*const {user, password, firstname, lastname, email, contact, security_answer}      = req.body;*/
        const { fullname, username, password }      = req.body;
        const users     = new MDB_USERS();
        
        /*const usersRes = await users.add({user, password, firstname, lastname, email, contact, security_answer});*/
        const usersRes = await users.add({ fullname, username, password });
        res.json(usersRes).status(200);
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }
});

module.exports = app;