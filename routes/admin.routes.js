var adminController = require('../controllers/admin.controller');
var sessionMiddleware = require("../utils/sessions");
var common = require('../utils/common')

module.exports = (app) =>{
    app.get("/admin/login",adminController.getLoginPage);
    app.get("/admin",sessionMiddleware.checkSession,adminController.getIndexPage);

    app.post("/auth/admin/login",adminController.login);
    app.post("/admin/logout",sessionMiddleware.destroySession);
    app.post('/admin/create',sessionMiddleware.checkSession,adminController.createAdmin);//to create admin
}