const Model = require('../models/model');

class activitiesModel extends Model {
    constructor(){
        super('tbl_activites');
    }
}

class adminModel  extends Model {
   constructor(){
        super('tbl_admin');
   }
}

class blogsModel extends Model {
    constructor(){
        super('tbl_blogs');
    }
}

class newsModel extends Model {
    constructor(){
        super('tbl_news');
    }
}

exports.activitiesModel = new activitiesModel;
exports.adminModel = new adminModel;
exports.blogsModel = new blogsModel;
exports.newsModel = new newsModel;