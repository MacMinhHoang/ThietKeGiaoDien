var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    if (req.session.questionID)
        req.session.questionID = null
    var vm = {
        session: req.session,
        rank: 10
    }
    res.render('result', vm);
});

module.exports = router;