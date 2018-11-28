var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
	if (!req.session.questionID)
		req.session.questionID = 1;
	let options=[]
	const op1 = {
        id: "1",
        content: "Thái Bình Dương"
    };
    options.push(op1)
    const op2 = {
        id: "2",
        content: "Bắc Băng Dương"
    };
    options.push(op2)
    const op3 = {
        id: "3",
        content: "Ấn Độ Dương"
    };
    options.push(op3)
    const op4 = {
        id: "4",
        content: "Đại Tây Dương"
    };
    options.push(op4)

    const quiz = {
    	question: "Câu hỏi " + req.session.questionID + " : Đại dương nào nhỏ nhất thế giới ?",
    	options: options,
    	result: "2",
    }

    req.session.curQuiz = quiz

    const vm = {
        session: req.session,
    }
    res.render('PvP', vm);
});

router.post('/', (req, res) => {
	const { id, chosen } = req.body
	let { score, time, right, wrong, opponentScore, opponentRight, opponentWrong } = req.body
	const answer = req.session.curQuiz.result
	
	if(chosen === answer){
        //Bạn trả lời đúng
		req.session.right = right? parseInt(right) + 1: 1
		req.session.wrong = wrong
        req.session.score = score? parseInt(score) + 5: 5

        //Đối thủ trả lời sai
        req.session.opponentRight = opponentRight
        req.session.opponentWrong = opponentWrong ? parseInt(opponentWrong) + 1: 1
        req.session.opponentScore = opponentScore
		req.session.isRight = true
	} else {
        //Bạn trả lời sai
		req.session.right = right
		req.session.wrong = wrong? parseInt(wrong) + 1: 1
        req.session.isRight = false
        
        //Đối thủ trả lời đúng
        req.session.opponentRight = opponentRight ? parseInt(opponentRight) + 1: 1
        req.session.opponentWrong = opponentWrong 
        req.session.opponentScore = opponentScore ? parseInt(opponentScore) + 5: 5
	}
	//req.session.time = time
	req.session.curChosen = chosen
	res.redirect(`/pvp`)
})

router.post('/next', (req, res) => {
	req.session.isRight = ""
    req.session.curChosen = ""
    req.session.questionID = req.session.questionID + 1
	res.redirect('/pvp')
})

router.post('/cancel', (req, res) => {
    if (req.session.questionID < 5)
    {
        req.session.opponentScore = null
        req.session.opponentRight = null
        req.session.opponentWrong = null
        req.session.questionID = null
        res.redirect('/home')
    }
	else res.redirect('/result/pvp')
})

module.exports = router;