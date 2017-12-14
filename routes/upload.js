/**
 * Created by user on 11/10/2017.
 */
var express = require('express')
var router = express.Router()
var crypto = require('crypto');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/db12980935-node";
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var fileUpload = require('express-fileupload');

// Default route http://localhost:3000/
router.use(fileUpload());

// Form POST action handler
router.post('/', function (req, res, next){


        sess = req.session;
        var user = sess.userName;
    MongoClient.connect(url, function(err, db){
        // read the img file from tmp in-memory location
        //var newImg = fs.readFileSync(req.file.profileImage);
        // encode the file as a base64 string.
        //var encImg = newImg.toString('base64');
        // define your new document
        var profilePic = "profilePic";
        db.collection("users").findOne({"userName" : sess.userName},function(err, result1) {
            var bData =req.files.profileImage.data;
            bData = bData.toString('base64');

            result1[profilePic] = bData;
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;


                db.collection('users')
                    .updateOne({"userName": sess.userName}, result1, function (err, result) {
                        if (err) {

                        }
                        res.redirect('/dashboard');
                    });
            });
        });

    });

});

module.exports = router;