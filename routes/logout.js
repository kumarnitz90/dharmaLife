/**
 * Created by user on 11/10/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            sess = req.session;
            //console.log(sess);
            res.redirect('/');
        }
    });
   // res.redirect('/');
});

module.exports = router;
