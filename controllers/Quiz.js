var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    var vm = {
        session: req.session
    }
    res.render('Quiz', vm);
});

module.exports = router;