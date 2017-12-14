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
router.get('/', function(req, res, next) {
    sess = req.session;
    if(sess.userName){
        //var user = userName
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("users").findOne({"userName" : sess.userName},function(err, result) {
                if (err) {
                    //console.log(result);
                    res.send({"status":"unsuccess"});
                }else {

                    res.render('dashboard', { result: result });
                }

                });
        });

    }else{
        res.redirect('/');
    }


});

module.exports = router;
