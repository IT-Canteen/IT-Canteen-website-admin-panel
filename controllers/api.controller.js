var activitesModel = require('../models').activitiesModel;
var vlogsModel = require('../models').blogsModel;
var newsModel = require('../models').newsModel;
var apiResponse = require('../utils/apiResponses');

exports.getActivitiesList = (req,res)=>{
    activitesModel.get_all().then((value)=>{
        apiResponse.successResponse(req,res,"Success",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.getVlogsList = (req,res)=>{
    vlogsModel.get_all().then((value)=>{
        apiResponse.successResponse(req,res,"Success",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.getNewsList = (req,res)=>{
    newsModel.get_all().then((value)=>{
        apiResponse.successResponse(req,res,"Success",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.searchActivitiesList = (req,res)=>{
    var data = req.query.search;
    var result = activitesModel.searchByActivityDesc(data);
    result.then((value)=>{
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.searchVlogsList = (req,res)=>{
    var data = req.query.search;
    var result = vlogsModel.searchByActivityDesc(data);
    result.then((value)=>{
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.searchNewsList = (req,res)=>{
    var data = req.query.search;
    var result = newsModel.searchByActivityDesc(data);
    result.then((value)=>{
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}