const express       = require('express');
const app           = express();
const cors          = require('cors')
const bodyParser    = require('body-parser');
const jsonParser    = bodyParser.json();

app.use(cors());

const front_controller = require('./controllers/FrontController');

app.post('/api/front/login', jsonParser, front_controller.login);
app.post('/api/front/create_admin', jsonParser, front_controller.createAdmin);
app.post('/api/front/register', jsonParser, front_controller.register);

app.listen({port: 4001}, (err) =>
{
    if(err)
    {
        console.log(err);
        process.exit(1);
    }
    else
    {
        console.log('Server is up and running on port 4001...');
    }
});