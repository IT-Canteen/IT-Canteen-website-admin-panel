var session = require('../utils/sessions');
//models
var adminModel = require('../models').adminModel;
var adminActivitesModel = require('../models').activitiesModel;
var vlogsModel = require('../models').blogsModel;
var newsModel = require('../models').newsModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');

exports.login = (req,res)=>{
    let name = req.body.name;
    let password = req.body.password;
    // var body = req.body;
    // var token = common.generateToken(body);
    // console.log(`Token is = ${token}`);
    var data = adminModel.adminCheckLogin(name,common.encryptPassword(password));
    data.then((value)=>{
        if(name == value[0].admin_name && common.encryptPassword(password) == value[0].admin_password){
            session.createSession(req,{name:value[0].admin_name});
            session.createAdminId(req,value[0].id);
            session.createAdminName(req,value[0].admin_name);
            res.status(200).json({
                url:"/admin"
            })
        }else{
            res.status(200).json({
                message:"User not found"
            })
        }
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}
exports.createAdmin = (req,res)=>{
    var body = req.body;
    var data = {
        admin_name : body.adminName,
        admin_email : body.adminEmail,
        admin_password : common.encryptPassword(body.adminPassword),
        create_At : common.now()
    }
    adminModel.create(data).then(async(value)=>{
        await adminActivitesModel.get_all().then((value)=>{
            var activitiesCount = 0;
            for(var i=0;i<value.length;i++){
                ++activitiesCount;
            }
            adminModel.createActivitiesCountsToAdmin(activitiesCount);
        });
        await vlogsModel.get_all().then((value)=>{
            var vlogsCount = 0;
            for(var i=0;i<value.length;i++){
                ++vlogsCount;
            }
            adminModel.createVlogsCountsToAdmin(vlogsCount);
        })
        await newsModel.get_all().then((value)=>{
            var newsCount = 0;
            for(var i=0;i<value.length;i++){
                ++newsCount;
            }
            adminModel.createNewsCountsToAdmin(newsCount);
        })
        apiResponse.successResponse(req,res,"Admin Created!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,`Sorry! ${err}`);
    })
}

exports.getLoginPage = (req,res)=>{
    res.render('pages/admin/admin.auth.ejs',{
        title : "Login | IT Canteen"
    })
}

exports.getIndexPage = (req,res)=>{
    var id = req.session.admin_id;
    adminModel.find(id).then((value)=>{
        res.render('pages/admin/admin.index.ejs',{
            title : "Admin | IT Canteen ",
            adminName : value.admin_name,
            activitiesCount : value.activities_counts,
            vlogsCount : value.vlogs_counts,
            newsCount : value.news_counts
        })
    })
}

