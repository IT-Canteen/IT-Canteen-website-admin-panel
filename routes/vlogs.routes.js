var vlogsController = require('../controllers/vlogs.controller');
var sessionMiddleware = require('../utils/sessions');

module.exports = (app)=>{
    app.post('/vlogs/create',sessionMiddleware.checkSession,vlogsController.createVlogs);
    app.get("/vlogs",sessionMiddleware.checkSession,vlogsController.getVlogsPage);
    app.get("/vlogs/:id",sessionMiddleware.checkSession,vlogsController.getVlogsDetails);
    app.put('/vlogs/update/:id',sessionMiddleware.checkSession,vlogsController.updateVlogsPost);
    app.delete('/vlogs/delete/:id',sessionMiddleware.checkSession,vlogsController.deleteVlogsPost);
}