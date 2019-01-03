var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', restrict, (req, res) => {
	if (!req.session.questionID){
		req.session.questionID = 1;
		req.session.score = 0;
		req.session.enemyscore = 0;
		req.session.right = 0;
		req.session.wrong = 0;
	}
	let type = ''
	if(req.session.questionID%2==0) {
		req.session.even = true
		type="text4"
	}else{
		req.session.even = false
	}
		
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
    res.render('PvP', vm);
});

// router.post('/', (req, res) => {
// 	const { id, chosen } = req.body
// 	let { score, time, right, wrong, opponentScore, opponentRight, opponentWrong } = req.body
// 	const answer = req.session.curQuiz.result
	
// 	if(chosen === answer){
//         //Bạn trả lời đúng
// 		req.session.right = right? parseInt(right) + 1: 1
// 		req.session.wrong = wrong
//         req.session.score = score? parseInt(score) + 5: 5

//         //Đối thủ trả lời sai
//         req.session.opponentRight = opponentRight
//         req.session.opponentWrong = opponentWrong ? parseInt(opponentWrong) + 1: 1
//         req.session.opponentScore = opponentScore
// 		req.session.isRight = true
// 	} else {
//         //Bạn trả lời sai
// 		req.session.right = right
// 		req.session.wrong = wrong? parseInt(wrong) + 1: 1
//         req.session.isRight = false
        
//         //Đối thủ trả lời đúng
//         req.session.opponentRight = opponentRight ? parseInt(opponentRight) + 1: 1
//         req.session.opponentWrong = opponentWrong 
//         req.session.opponentScore = opponentScore ? parseInt(opponentScore) + 5: 5
// 	}
// 	//req.session.time = time
// 	req.session.curChosen = chosen
// 	res.redirect(`/pvp`)
// })

router.post('/', (req, res) => {
	const { id, chosen } = req.body
	let { score, enemyscore , time, right, wrong } = req.body
	const answer = req.session.curQuiz.result
	let isNeg = false
	
	if(chosen === answer){
		req.session.right = right? parseInt(right) + 1: 1
		req.session.wrong = wrong
		req.session.score = score? parseInt(score) + 5: 5
		// time = parseInt(time) + 5
		req.session.isRight = true
	} else {
		req.session.right = right
		req.session.wrong = wrong? parseInt(wrong) + 1: 1
		req.session.score = score? parseInt(score)>2? parseInt(score)- 2: 0: 0
		// time = parseInt(time)>5 ? parseInt(time) - 5 : 0
		req.session.isRight = false
	}

	req.session.enemyscore = enemyscore? parseInt(enemyscore) + 5: 5

	
	if(req.session.questionID > 5){
		isNeg = true
	}
	req.session.time = time
	req.session.curChosen = chosen
	res.render(`perPvP`, {session: req.session, isNeg: isNeg})
})

router.post('/next', (req, res) => {
	req.session.isRight = ""
	req.session.curChosen = ""
	console.log(req.session.questionID)
	req.session.questionID = req.session.questionID + 1
	res.redirect('/pvp')
})

router.post('/cancel', (req, res) => {
	if (req.session.questionID)
        req.session.questionID = null
    req.session.time = 10
	res.redirect('/result/pvp')
})

// router.post('/next', (req, res) => {
// 	req.session.isRight = ""
//     req.session.curChosen = ""
//     req.session.questionID = req.session.questionID + 1
// 	res.redirect('/pvp')
// })

// router.post('/cancel', (req, res) => {
//     if (req.session.questionID < 5)
//     {
//         req.session.opponentScore = null
//         req.session.opponentRight = null
//         req.session.opponentWrong = null
//         req.session.questionID = null
//         res.redirect('/home')
//     }
// 	else res.redirect('/result/pvp')
// })

module.exports = router;