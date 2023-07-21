var apiController = require('../controllers/api.controller');
var common = require('../utils/common');
module.exports = (app)=>{
    app.get('/api/activities',apiController.getActivitiesList);//this is being used with limt offset
    app.get('/api/vlogs',apiController.getVlogsList);
    app.get('/api/news',apiController.getNewsList);

    //getting last 6 activities route
    app.get('/api/activity',apiController.getLastSixActivity);

    //get upcoming activity 
    app.get('/api/upcoming/activity',apiController.getUpcomingActivity)

    //api search routes
    app.get('/api/search/activities',apiController.searchActivitiesList);
    app.get('/api/search/vlogs',apiController.searchVlogsList);
    app.get('/api/search/news',apiController.searchNewsList);

    // registrition member route
    app.post('/api/register',apiController.createRegister);

    //test api
    app.get('/api/test',apiController.test);
}