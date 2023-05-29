var apiController = require('../controllers/api.controller');
module.exports = (app)=>{
    app.get('/api/activities', apiController.getActivitiesList);
    app.get('/api/vlogs',apiController.getVlogsList);
    app.get('/api/news',apiController.getNewsList);
    app.get('/api/search/activities',apiController.searchActivitiesList);
    app.get('/api/search/vlogs',apiController.searchVlogsList);
    app.get('/api/search/news',apiController.searchNewsList);
}