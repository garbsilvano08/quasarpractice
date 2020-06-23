const express       = require('express');
const app           = express();
const cors          = require('cors')

app.use(cors());

const front_controller = require('./controllers/FrontController');

app.post('/api/front/login', front_controller.login)


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