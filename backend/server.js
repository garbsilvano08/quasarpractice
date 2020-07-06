const express       = require('express');
const app           = express();
const cors          = require('cors')
const bodyParser    = require('body-parser');

app.use(cors());

// Public Folder
app.use(express.static('./uploads'));

const front_controller = require('./controllers/FrontController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login',            front_controller.login);
app.post('/api/front/create_admin',     front_controller.createAdmin);
app.post('/api/front/register',         front_controller.register);


const member_controller     = require('./controllers/MemberController');
const member_only           = require('./middleware/MemberOnly');

app.post('/api/member/add/staff', member_controller.addNewStaff);
app.post('/api/member/add/blacklist', member_controller.addNewBlacklist);
app.post('/api/member/user/list', member_only, member_controller.userList);
app.post('/api/member/add/person',  member_only, member_controller.addPerson);
app.post('/api/member/add/visitor',  member_only, member_controller.addVisitor);
app.post('/api/member/add/pass_log',  member_only, member_controller.addPassLog);
app.post('/api/member/get/nearby_places',  member_only, member_controller.getNearbyPlaces);
app.post('/api/member/get/coordinates',  member_only, member_controller.getCoordinates);
app.post('/api/member/get/visitors', member_only, member_controller.getVisitors);
app.post('/api/member/add/company',  member_only, member_controller.addCompany);
app.post('/api/member/get/companies',  member_only, member_controller.getCompanies);
app.post('/api/member/delete/company',  member_only, member_controller.deleteCompany);
app.post('/api/member/get/staff',  member_only, member_controller.getStaffs);
app.post('/api/member/remove/account',  member_only, member_controller.removeAccount);
app.post('/api/member/get/blacklist',  member_only, member_controller.getBlacklists);



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