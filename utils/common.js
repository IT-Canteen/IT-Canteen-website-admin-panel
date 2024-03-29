var md5 = require('md5');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var secret = 'itcanteen';

exports.encryptPassword = (password) => {
    return md5(md5(password) + 'itcanteen');
}

exports.now = () => {
    const date = new Date();
    return moment(date).format('YYYY-MM-DD');
}

exports.formatTime = (date)=>{
    return moment(date).format("hh:mm a");
}

exports.prettifyArray = (data) => {
    data.forEach((value, index) => {
        Object.entries(value).forEach(entry => {
            //check null value
            if(entry[1] === null){
                value[entry[0]] = ''
            }

            //
            if(entry[1] instanceof Date){
                value[entry[0]] = moment(value[entry[0]]).format('YYYY-MM-DD');
            }
        });
    });
    return data;
}

    exports.generateToken = (data) => {
    return jwt.sign(data, secret, { expiresIn: '3h'});
}


exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(token);
    if(!token){
        res.status(404).json({
            "code": 404,
            "message": "Not provided"
        });
    }else{
        jwt.verify(token, secret, (err, decode) => {
            if(err){
                res.status(404).json({
                    "code": 404,
                    "message": err
                });
            }else{
                next();
            }
        });
    }
}