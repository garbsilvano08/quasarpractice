//frontend
exports.postLoginUser 	    = 'front/login';
exports.postCreateAdmin     = 'front/create_admin';

//admin


//member
exports.postGetCompany      = 'member/get/company';
exports.postUserList        = 'member/user/list';
exports.postAddPerson       = 'member/add/person';
exports.postGetCompanies    = 'member/get/companies';
exports.postDeleteCompany   = 'member/delete/company';

exports.postUpdateVisitor   = 'member/update/visitor';
exports.postGetVisitors     = 'member/get/visitors';
exports.postRemoveAccount   = 'member/remove/account';
exports.postUpdateStaff     = 'member/update/staff';
exports.postGetStaff        = 'member/get/staff';
exports.postAddStaff        = 'member/add/staff';
exports.postAddBlacklist    = 'member/add/blacklist';
exports.postGetBlacklist    = 'member/get/blacklist';
exports.postUpdateBlacklist = 'member/update/blacklist';
exports.postAddDevice       = 'member/add/device';
exports.postGetDevice       = 'member/get/device';
exports.postDeleteDevice    = 'member/delete/device';
exports.postGetPersonLogs   = 'member/get/db_person_logs';


// Person
exports.postSavePerson      = 'member/save/person';
exports.postGetPersons      = 'member/get/persons';
exports.postGetPerson       = 'member/get/person';

exports.postGetWeeklyCount  = 'member/get/weekly_count';
exports.postCountLogs       = 'member/count/logs';
exports.postGetDailyLog     = 'member/get/daily_log';
exports.postGetLogs         = 'member/get/logs';
exports.postFindLogs        = 'member/find/logs';
exports.postPersonByCateg   = 'member/get/logs_by_category';
// exports.postAddPersonTablet     = 'member/user/addPersonTablet';