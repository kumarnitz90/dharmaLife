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
    if(sess.userName){
        //var user = userName
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("users").findOne({"userName" : sess.userName},function(err, result1) {
                if (err) {
                    //console.log(result);
                    res.send({"status":"unsuccess"});
                }else {
                    result1["status"]="inactive";
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;

                        db.collection("users").updateOne({"userName" :sess.userName},result1, function(err, res) {
                            if (err) throw err;
                            //console.log("1 document updated");
                            //sess=req.session;
                            //sess.userName = req.body.username;



                        });

                        //res.send({'result':'success'});

                    });

                }

            });

        });
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                //sess = req.session;
                //console.log(sess);
                //res.redirect('/');
            }
        });
        res.send('success');
    }else{
        res.redirect('/');
    }
    //res.render('index', { title: 'Express' });
});

module.exports = router;
