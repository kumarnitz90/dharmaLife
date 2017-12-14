/**
 * Created by user on 11/10/2017.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/db12980935-node";
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
/* GET home page. */
router.post('/', function(req, res, next) {

    var userName = req.body.username;
    var password = req.body.password;
    var hashedPassword = crypto.createHash('sha256').update(password).digest('base64');

    var userDetail = {
        userName : userName,
        password : hashedPassword,
        status : "active"
    };

    //console.log(req.body.userName);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").findOne(userDetail,function(err, result) {
            if (err) {
                //console.log(result);
                res.send({"status":"unsuccess"});
            }else{

                if(result != null){
                    sess=req.session;
                    sess.userName = req.body.username;
                    //console.log(result);
                    res.send({"status":"success"});
                }else{
                    res.send({"status":"unsuccess"});
                }


            }
            db.close();
        });
    });
    //res.render('index', { title: 'Express' });
});

module.exports = router;
