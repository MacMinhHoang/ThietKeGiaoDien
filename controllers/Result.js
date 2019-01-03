var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/quiz', restrict, (req, res) => {
    var vm = {
        session: req.session,
        rank: 10,
    }

    res.render('resultQuiz', vm);
});

router.get('/pvp', restrict, (req, res) => {
    var vm = {
        session: req.session,
        rank: 10,
    }

    res.render('resultPvP', vm);
});

module.exports = router;