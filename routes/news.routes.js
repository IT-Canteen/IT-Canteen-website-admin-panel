var newsController = require('../controllers/news.controller');
var sessionMiddleware = require('../utils/sessions');

module.exports = (app) =>{
    app.post('/news/create',sessionMiddleware.checkSession,newsController.createNewsPost);
    app.get('/news',sessionMiddleware.checkSession,newsController.getNewsPage);
    app.get('/news/:id',sessionMiddleware.checkSession,newsController.getNesDetails);
    app.put('/news/update/:id',sessionMiddleware.checkSession,newsController.updateNewsPost);
    app.delete('/news/delete/:id',sessionMiddleware.checkSession,newsController.deleteNewsPost)
}