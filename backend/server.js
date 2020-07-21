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
const count_controller     = require('./controllers/CountController');
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
app.post('/api/member/get/staff',  member_only, member_controller.getStaffs);
app.post('/api/member/remove/account',  member_only, member_controller.removeAccount);
app.post('/api/member/get/blacklist',  member_only, member_controller.getBlacklists);
app.post('/api/member/update/staff',  member_only, member_controller.updateStaff);
app.post('/api/member/update/blacklist',  member_only, member_controller.updateBlacklist);
app.post('/api/member/update/visitor',  member_only, member_controller.updateVisitor);

//Device
app.post('/api/member/add/device',  member_only, member_controller.addDevice);
app.post('/api/member/get/device',  member_only, member_controller.getDevices);
app.post('/api/member/delete/device',  member_only, member_controller.deleteDevices);

//User
app.post('/api/member/add/user',  member_only, member_controller.addUser);
app.post('/api/member/get/user',  member_only, member_controller.getUsers);
app.post('/api/member/delete/user',  member_only, member_controller.deleteUsers);
app.post('/api/member/update/user',  member_only, member_controller.updateUser);

// Companies
app.post('/api/member/add/company',  member_only, member_controller.addCompany);
app.post('/api/member/edit/company',  member_only, member_controller.editCompany);
app.post('/api/member/update/company',  member_only, member_controller.addCompany);
app.post('/api/member/get/companies',  member_only, member_controller.getCompanies);
app.post('/api/member/delete/company',  member_only, member_controller.deleteCompany);
app.post('/api/member/get/company',  member_only, member_controller.getCompany);

// Person
app.post('/api/member/save/person',  member_only, member_controller.savePerson);
app.post('/api/member/get/persons',  member_only, member_controller.getPersons);
app.post('/api/member/get/person',  member_only, member_controller.getPerson);

//Count
app.post('/api/member/count/logs',  member_only, count_controller.counterLogs);
app.post('/api/member/get/daily_log',  member_only, count_controller.getCountDaily);
app.post('/api/member/get/weekly_count',  member_only, count_controller.getOneWeekTrafficCount);


//Logs
app.post('/api/member/get/logs',  member_only, member_controller.getLogs);
app.post('/api/member/find/logs',  member_only, member_controller.getFindLogs);

app.post('/api/member/get/logs_by_category',  member_only, count_controller.getPersonLogs);
app.post('/api/member/get/latest_log',  member_only, count_controller.getLatestLog);
app.post('/api/member/get/all_logs',  member_only, count_controller.getAllLogs);
app.post('/api/member/get/purpose_visit',  member_only, count_controller.getDailyPurposeVisit);

// Excel export
app.post('/api/member/export/fever_detected',  member_only, member_controller.exportFeverDetected);
app.post('/api/member/export/person',  member_only, member_controller.exportPerson);

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