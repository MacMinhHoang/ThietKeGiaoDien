var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
    
    res.render('resultQuiz', vm);
});

module.exports = router;