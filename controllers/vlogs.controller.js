var session = require('../utils/sessions');
var vlogModel = require('../models').blogsModel;
var adminModel = require('../models').adminModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');

exports.createVlogs = (req,res)=>{
    var body = req.body;
    var data = {
        descriptions : body.description,
        video : body.video,
        created_At : common.now()
    }
    var result = vlogModel.create(data);
    result.then(async(value)=>{
        await vlogModel.get_all().then((value)=>{
            var vlogsCount = 0;
            for(var i=0;i<value.length;i++){
                ++vlogsCount;
            }
            adminModel.createVlogsCountsToAdmin(vlogsCount);
        })
        apiResponse.successResponse(req,res,"vlog post created!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,`Sorry ${err}`);
    })
}

exports.getVlogsDetails = (req,res)=>{
    var id = req.params.id;
    vlogModel.find(id).then((value)=>{
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.updateVlogsPost = (req,res)=>{
    var id = req.params.id;
    var body = req.body;
    var data = {
        descriptions:body.description,
        video:body.video,
        updated_At:common.now()
    }
    var result = vlogModel.update(id,data);
    result.then((value)=>{
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.deleteVlogsPost = (req,res)=>{
    var id = req.params.id;
    vlogModel.delete(id).then(async(value)=>{
        await vlogModel.get_all().then((value)=>{
            var vlogsCount = 0;
            for(var i=0;i<value.length;i++){
                ++vlogsCount;
            }
            adminModel.createVlogsCountsToAdmin(vlogsCount);
        })
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}

exports.getVlogsPage = (req, res) => {
    vlogModel.get_all().then((value) => {

        res.render('pages/admin/admin.vlogs.ejs', {
            title: "Admin | IT Canteen ",
            adminName: req.session.admin_name,
            value: value,
            date: common.now()
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}