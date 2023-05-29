var session = require('../utils/sessions');
var newsModel = require('../models').newsModel;
var adminModel = require('../models').adminModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {  // profile-
        var uniqueSuffix = Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
})

var upload = multer({
    storage: storage
});

exports.createNewsPost = [upload.single('news_img'), (req, res) => {
    var body = req.body;
    var data = {
        descriptions: body.description,
        img: "/images/" + req.file.originalname,
        created_At: common.now()
    }
    var result = newsModel.create(data);
    result.then(async (value) => {
        await newsModel.get_all().then((value) => {
            var newsCount = 0;
            for (var i = 0; i < value.length; i++) {
                ++newsCount;
            }
            adminModel.createNewsCountsToAdmin(newsCount);
        })
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry ${err}`);
    })
}]

exports.getNewsPage = (req, res) => {
    newsModel.get_all().then((value) => {
        res.render('pages/admin/admin.news.ejs', {
            title: "Admin | IT Canteen ",
            adminName: req.session.admin_name,
            value: value,
            date: common.now()
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getNesDetails = (req, res) => {
    var id = req.params.id;
    newsModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Success Details!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.updateNewsPost = [upload.single('edit_news_img'), (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var data = {
        descriptions: body.description,
        img: "/images/" + req.file.originalname,
        updated_At: common.now()
    }
    var result = newsModel.update(id,data);
    result.then((value)=>{
        apiResponse.successResponse(req,res,"Success Update!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}]

exports.deleteNewsPost = (req,res)=>{
    var id = req.params.id;
    newsModel.delete(id).then(async(value)=>{
        await newsModel.get_all().then((value) => {
            var newsCount = 0;
            for (var i = 0; i < value.length; i++) {
                ++newsCount;
            }
            adminModel.createNewsCountsToAdmin(newsCount);
        })
        apiResponse.successResponse(req,res,"Success!",value);
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,err);
    })
}