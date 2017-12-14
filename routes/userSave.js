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

    var pass = req.body.password;

    var hashedPassword = crypto.createHash('sha256').update(pass).digest('base64');
    var createdAt = Date.now();
    var vuserDetails = {
        fName:req.body.fName,
        lName:req.body.lName,
        email:req.body.email,
        userName:req.body.username,
        role:req.body.role,
        aboutMe:req.body.aboutMe,
        password:hashedPassword,
        status:"active",
        createdAt:createdAt
    };

    mongo.connect(url,function(err, db){
        assert.equal(null, err);
        db.collection('users').insertOne(vuserDetails, function(err, db){
            assert.equal(null, err);
            res.send({ data : 'success' });
            //console.log('inserted');
            // db.close();
        });
        db.close();

    });

    //res.render('index', { title: 'Express' });
});

module.exports = router;
