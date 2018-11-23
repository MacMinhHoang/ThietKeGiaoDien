var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    res.render('HomePage');
});

router.post('/', (req, res) => {
    req.session.field = req.body.inputField;
    req.session.difficulty = req.body.inputDifficulty;
    res.redirect(req.body.url);
});

module.exports = router;