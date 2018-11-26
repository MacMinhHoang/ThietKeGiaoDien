var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    res.render('HomePage');
});

router.post('/', (req, res) => {
    req.session.field = req.body.inputField;
    req.session.difficulty = req.body.inputDifficulty;
    req.session.time = 60;
    req.session.right = 0;
    req.session.wrong = 0;
    req.session.score = 0;
    res.redirect(req.body.url);
});

module.exports = router;