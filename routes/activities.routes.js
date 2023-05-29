var activitesController = require('../controllers/activities.controller');
var sessionMiddleware = require('../utils/sessions');

module.exports=(app)=>{
    app.post('/activities/create',sessionMiddleware.checkSession,activitesController.createActivitiesPost);
    app.get("/activities",sessionMiddleware.checkSession,activitesController.getActivitiesPage);
    app.get("/activities/:id",sessionMiddleware.checkSession,activitesController.getActivitiesDetails);
    app.put("/activities/update/:id",sessionMiddleware.checkSession,activitesController.updateActivitiesPost);
    app.delete("/activities/delete/:id",sessionMiddleware.checkSession,activitesController.deleteActivitiesPost);
}