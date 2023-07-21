var activitesController = require('../controllers/activities.controller');
var sessionMiddleware = require('../utils/sessions');

module.exports=(app)=>{
    //activities and upcoming activities create
    app.post('/activities/create',sessionMiddleware.checkSession,activitesController.createActivitiesPost);
    app.post('/activities/upcoming/create',sessionMiddleware.checkSession,activitesController.createUpComingActivities);

    //get activities and upcoming page
    app.get("/activities",sessionMiddleware.checkSession,activitesController.getActivitiesPage);
    app.get('/activities/upcoming',sessionMiddleware.checkSession,activitesController.getUpcomingActivitesPage);

    //get activites and upcoming details
    app.get("/activities/:id",sessionMiddleware.checkSession,activitesController.getActivitiesDetails);
    app.get("/activities/upcoming/:id",sessionMiddleware.checkSession,activitesController.getUpcomingActivitiesDetails);

    //update activites and upcoming activities 
    app.put("/activities/update/:id",sessionMiddleware.checkSession,activitesController.updateActivitiesPost);
    app.put("/activities/upcoming/:id",sessionMiddleware.checkSession,activitesController.updateUpcomingActivitiesPost);

    //delete activities and upcoming activites 
    app.delete("/activities/delete/:id",sessionMiddleware.checkSession,activitesController.deleteActivitiesPost);
    app.delete("/activites/upcoming/delete/:id",sessionMiddleware.checkSession,activitesController.deleteUpcomingActivitiesPost);
}