const express           = require('express');
const bodyParser        = require('body-parser');
const MDB_WALLETS       = require('../../models/MDB_WALLETS');

const app               = express();
const jsonParser        = bodyParser.json();

app.post('/', jsonParser, async (req, res) => {
    try {
        const {public_key, private_key, balance, USER_ID}      = req.body;
        const wallets  = new MDB_WALLETS();
        
        const walletsRes = await wallets.add({public_key, private_key, balance, USER_ID});
        res.json(walletsRes).status(200);
    } catch (error) {
        console.log(error);
        res.send(error).status(500);
    }
});

module.exports = app;