const Model = require('../models/model');

class activitiesModel extends Model {
    constructor(){
        super('tbl_activites');
    }
}

class upComingActivityModel extends Model{
    constructor(){
        super('tbl_upcoming_acti');
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

class registerModel extends Model{
    constructor(){
        super('tbl_register');
    }
}

exports.activitiesModel = new activitiesModel;
exports.upComingActivityModel = new upComingActivityModel;
exports.adminModel = new adminModel;
exports.blogsModel = new blogsModel;
exports.newsModel = new newsModel;
exports.registerModel = new registerModel;
