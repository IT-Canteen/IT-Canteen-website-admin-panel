var session = require('../utils/sessions');
var activitesModel = require('../models').activitiesModel;
var adminModel = require('../models').adminModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
})

var upload = multer({
    storage: storage
});

exports.createActivitiesPost = [upload.single('activities_img'), (req, res) => {
    var body = req.body;
    var data = {
        descriptions: body.description,
        img: "/images/" + req.file.originalname,
        created_At: common.now()
    }
    var result = activitesModel.create(data);
    result.then(async (value) => {
        // await activitesModel.get_all().then((value) => {
        //     var activitiesCount = 0;
        //     for (var i = 0; i < value.length; i++) {
        //         ++activitiesCount;
        //     }
        //     adminModel.createActivitiesCountsToAdmin(activitiesCount);
        // })
        apiResponse.successResponse(req, res, "activity posts created!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry ${err}`);
    })
}]

exports.updateActivitiesPost = [upload.single('edit_activity_img'), (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var data = {
        descriptions: body.description,
        img: "/images/" + req.file.originalname,
        updated_At: common.now()
    }
    var result = activitesModel.update(id, data);
    result.then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry ${err}`);
    })
}]

exports.deleteActivitiesPost = (req, res) => {
    var id = req.params.id;
    activitesModel.delete(id).then(async (value) => {
        await activitesModel.get_all().then((value) => {
            var activitiesCount = 0;
            for (var i = 0; i < value.length; i++) {
                ++activitiesCount;
            }
            adminModel.createActivitiesCountsToAdmin(activitiesCount);
        })
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getActivitiesPage = (req, res) => {
    activitesModel.get_all().then((value) => {

        res.render('pages/admin/admin.activities.ejs', {
            title: "Admin | IT Canteen ",
            adminName: req.session.admin_name,
            value: value,
            date: common.now()
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getActivitiesDetails = (req, res) => {
    var id = req.params.id;
    activitesModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Success Details!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}