var apiController = require('../controllers/api.controller');
var common = require('../utils/common');
module.exports = (app)=>{
    app.get('/api/activities',common.verifyToken,apiController.getActivitiesList);
    app.get('/api/vlogs',common.verifyToken,apiController.getVlogsList);
    app.get('/api/news',common.verifyToken,apiController.getNewsList);
    app.get('/api/search/activities',common.verifyToken,apiController.searchActivitiesList);
    app.get('/api/search/vlogs',common.verifyToken,apiController.searchVlogsList);
    app.get('/api/search/news',common.verifyToken,apiController.searchNewsList);

    //post registrition
    app.post('/api/register',common.verifyToken,apiController.createRegister);
}