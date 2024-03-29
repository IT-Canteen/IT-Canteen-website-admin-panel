var activitesModel = require('../models').activitiesModel;
var vlogsModel = require('../models').blogsModel;
var newsModel = require('../models').newsModel;
var registerModel = require('../models').registerModel;
const { upComingActivityModel } = require('../models');
var apiResponse = require('../utils/apiResponses');

var data = [];
exports.test = async (req, res) => {
    await activitesModel.get_all().then((value) => {
        value.map((d,i)=>{
            data.push(d);
        })
    }).then((err) => {
        // apiResponse.errorResponse(req, res, err);
        console.log(err);
    })


    await vlogsModel.get_all().then((value) => {
        // apiResponse.successResponse(req,res,"Success!",value);
        // console.log(value);
        value.map((d,i)=>{
            data.push(d);
        })

    }).then((err) => {
        // apiResponse.errorResponse(req,res,err);
        console.log(err);
    })

    await newsModel.get_all().then((value) => {
        // apiResponse.successResponse(req,res,"Success!",value);
        // console.log(value);
        value.map((d,i)=>{
            data.push(d);
        })

    }).then((err) => {
        // apiResponse.errorResponse(req,res,err);
        console.log(err);
    })
    res.json(data)
}

exports.getActivitiesList = (req, res) => {
    // activitesModel.get_all().then((value)=>{
    //     apiResponse.successResponse(req,res,"Success",value);
    // }).catch((err)=>{
    //     apiResponse.errorResponse(req,res,err);
    // })
    var page = req.query.page || 1;
    activitesModel.getActivityList(page).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getUpcomingActivity = (req, res) => {
    upComingActivityModel.getLastUpcomingActivityList().then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getLastSixActivity = (req, res) => {
    activitesModel.getLastSixActivity().then((value) => {
        apiResponse.successResponse(req, res, 'Success!', value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err)
    })
}

exports.getVlogsList = (req, res) => {
    vlogsModel.get_all().then((value) => {
        apiResponse.successResponse(req, res, "Success", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getNewsList = (req, res) => {
    newsModel.get_all().then((value) => {
        apiResponse.successResponse(req, res, "Success", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.searchActivitiesList = (req, res) => {
    var data = req.query.search;
    var result = activitesModel.searchByActivityDesc(data);
    result.then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.searchVlogsList = (req, res) => {
    var data = req.query.search;
    var result = vlogsModel.searchByActivityDesc(data);
    result.then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.searchNewsList = (req, res) => {
    var data = req.query.search;
    var result = newsModel.searchByActivityDesc(data);
    result.then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.createRegister = (req, res) => {
    var body = req.body;
    var data = {
        name: body.name,
        phNo: body.ph_no,
        year: body.year,
        semister: body.semister
    }
    var result = registerModel.create(data);
    result.then((value) => {
        apiResponse.successResponse(req, res, "Success!");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}