var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/quiz', restrict, (req, res) => {
    var vm = {
        session: req.session,
        rank: 10
    }
    res.render('resultQuiz', vm);
});

router.get('/pvp', restrict, (req, res) => {
    var vm = {
        winner: req.session.score > req.session.opponentScore
    }
    req.session.opponentScore = null
    req.session.opponentRight = null
    req.session.opponentWrong = null
    res.render('resultPvP', vm);
});

module.exports = router;