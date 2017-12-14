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
    sess = req.session;
    var user = sess.userName;
    if(sess.userName){
        //var user = userName
        var oldPas = req.body.oldPas;
        var pass = req.body.password;
        if(pass == oldPas){
            var hashedPassword = pass;
        }else{
            var hashedPassword = crypto.createHash('sha256').update(pass).digest('base64');
        }


        var createdAt = Date.now();
        var vuserDetails = {
            fName:req.body.fName,
            lName:req.body.lName,
            email:req.body.email,
            userName:req.body.username,
            role:req.body.role,
            aboutMe:req.body.aboutMe,
            password:hashedPassword,
            createdAt:createdAt
        };
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("users").findOne({"userName" : sess.userName},function(err, result) {
                if (err) {
                    //console.log(result);
                    res.send({"status":"unsuccess"});
                }else {
                    vuserDetails["status"] = result.status;
                    //res.render('dashboard', { result: result });
                    var profile = result.profilePic;
                    if(profile != null || profile != undefined || profile != "null" || profile != "undefined" || profile != ""){
                        vuserDetails["profilePic"] = profile;
                    }
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;

                        db.collection("users").updateOne({"userName" :sess.userName},vuserDetails, function(err, res) {
                            if (err) throw err;
                            //console.log("1 document updated");
                            //sess=req.session;
                            //sess.userName = req.body.username;



                        });

                    });

                }



            });
            db.close();
            db.close();
        });

        var currentUName = req.body.username;
        if( user != currentUName){
            res.send('logout');
        }else{
            res.send('success');
        }


    }else{
        res.redirect('/');
    }
    //res.render('index', { title: 'Express' });
});

module.exports = router;
