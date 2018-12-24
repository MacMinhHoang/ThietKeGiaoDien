var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {
    req.session.user = req.body.nickname;
    res.redirect('/home/Category')
});

module.exports = router;