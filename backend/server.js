const express       = require('express');
const app           = express();
const cors          = require('cors')
const bodyParser    = require('body-parser');

app.use(cors());

const front_controller = require('./controllers/FrontController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login',            front_controller.login);
app.post('/api/front/create_admin',     front_controller.createAdmin);
app.post('/api/front/register',         front_controller.register);


const member_controller     = require('./controllers/MemberController');
const member_only           = require('./middleware/MemberOnly');

app.post('/api/member/user/list', member_only, member_controller.userList);
app.post('/api/member/add/person', member_only, member_controller.addPerson);

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