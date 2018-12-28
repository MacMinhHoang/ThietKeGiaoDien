var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
	if (!req.session.questionID){
		req.session.questionID = 1;
		req.session.score = 0;
		req.session.right = 0;
		req.session.wrong = 0;
	}
	let type = ''
	if(req.session.questionID%2==0) type = "text4";
		
	let options=[]
	const op1 = {
        id: "a",
        content: "Thái Bình Dương"
    };
    options.push(op1)
    const op2 = {
        id: "b",
        content: "Bắc Băng Dương"
    };
    options.push(op2)
    const op3 = {
        id: "c",
        content: "Ấn Độ Dương"
    };
    options.push(op3)
    const op4 = {
        id: "d",
        content: "Đại Tây Dương"
    };
    options.push(op4)

    const quiz = {
    	question: "Đại dương nào nhỏ nhất thế giới ?",
    	options: options,
    	result: "b",
    	type: type
    }

    req.session.curQuiz = quiz

    const vm = {
        session: req.session,
        notify: false
    }
    res.render('Quiz', vm);
});

router.post('/', (req, res) => {
	const { id, chosen } = req.body
	let { score, time, right, wrong } = req.body
	const answer = req.session.curQuiz.result
	
	if(chosen === answer){
		req.session.right = right? parseInt(right) + 1: 1
		req.session.wrong = wrong
		req.session.score = score? parseInt(score) + 5: 5
		time = parseInt(time) + 5
		req.session.isRight = true
	} else {
		req.session.right = right
		req.session.wrong = wrong? parseInt(wrong) + 1: 1
		req.session.score = score? parseInt(score)>5? parseInt(score)- 5: 0: 0
		time = parseInt(time)>5 ? parseInt(time) - 5 : 0
		req.session.isRight = false
	}
	req.session.time = time
	req.session.curChosen = chosen
	req.session.questionID = req.session.questionID + 1
	res.render(`perQuiz`, {session: req.session})
})

router.post('/next', (req, res) => {
	req.session.isRight = ""
	req.session.curChosen = ""
	res.redirect('/quiz')
})

router.post('/cancel', (req, res) => {
	if (req.session.questionID)
        req.session.questionID = null
    req.session.time = 60
	res.redirect('/result/quiz')
})

module.exports = router;