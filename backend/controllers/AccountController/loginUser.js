const express = require('express');
const bodyParser = require('body-parser');
const MDB_USER_DETAILS = require('../../models/MDB_USERS');

const app = express();
const jsonParser = bodyParser.json();

app.post('/', jsonParser, async(req, res) =>
{
	try
    {
		const body = req.body;
		const user_details = new MDB_USER_DETAILS();

		const userRes = await user_details.find({username: body.username, password: body.password});
		res.json(userRes).status(200);
        
		console.log(userRes);
	}
    catch(error)
    {
		console.log(error);
		res.json({error});
		res.status(500);	
	}
})
module.exports = app;