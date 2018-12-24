var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    res.redirect('/home/Category')
});

router.get('/Category', restrict, (req, res) => {
    res.render('Categories');
});

router.post('/Category', (req, res) => {
    req.session.cat = req.body.category;
    res.redirect('/home/Difficulty')
});

router.get('/Difficulty', restrict, (req, res) => {
    res.render('Difficulties');
});

router.post('/Difficulty', (req, res) => {
    req.session.dif = req.body.difficulty;
    res.redirect('/home/PlayMode')
});

router.get('/PlayMode', restrict, (req, res) => {
    res.render('PlayMode');
});

router.post('/PlayMode', (req, res) => {
    if (req.body.playmode === "Solo")
        res.redirect('/quiz');
    else res.redirect('/pvp');
});

module.exports = router;