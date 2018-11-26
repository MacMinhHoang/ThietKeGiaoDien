var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
	let options=[]
	const op1 = {
        id: "1",
        content: "Con chó"
    };
    options.push(op1)
    const op2 = {
        id: "2",
        content: "Con mèo"
    };
    options.push(op2)
    const op3 = {
        id: "3",
        content: "Con gà"
    };
    options.push(op3)
    const op4 = {
        id: "4",
        content: "Con heo"
    };
    options.push(op4)

    const quiz = {
    	question: "Put the question here",
    	options: options,
    	result: "2",
    }

    req.session.curQuiz = quiz

    const vm = {
        session: req.session,
    }
    res.render('Quiz', vm);
});

router.post('/', (req, res) => {
	const { id, time, chosen } = req.body
	let { score, right, wrong } = req.body
	const answer = req.session.curQuiz.result
	
	if(chosen === answer){
		req.session.right = right? parseInt(right) + 1: 1
		req.session.wrong = wrong
		req.session.score = score? parseInt(score) + 5: 5
		req.session.isRight = true
	} else {
		req.session.right = right
		req.session.wrong = wrong? parseInt(wrong) + 1: 1
		req.session.score = score? parseInt(score)>5? parseInt(score)- 5: 0: 0
		req.session.isRight = false
	}
	req.session.time = time
	req.session.curChosen = chosen

	res.redirect(`/quiz`)
})

router.post('/next', (req, res) => {
	req.session.isRight = ""
	req.session.curChosen = ""
	res.redirect('/quiz')
})

router.post('/cancel', (req, res) => {
	res.redirect('/result')
})

module.exports = router;