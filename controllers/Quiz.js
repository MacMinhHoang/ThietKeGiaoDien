var express = require('express');

var router = express.Router();

var restrict = require('../middle-wares/restrictUser');

router.get('/', (req, res) => {
	if(!req.query.id){
		req.session.time = 60;
		res.redirect('/quiz?id=1')
	}
	else{
		const { id } = req.query;
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

	    const vm = {
	        session: req.session,
	        question: "Put the question here",
	        options: options,
	        id: id
	    }
	    res.render('Quiz', vm);
	}
});

router.post('/', (req, res) => {
	const { id, time, chosen } = req.body
	let { score, right, wrong } = req.body
	const answer = "2" //hard code
	
	if(chosen === answer){
		req.session.right = right? parseInt(right) + 1: 1
		req.session.wrong = wrong
		req.session.score = score? parseInt(score) + 5: 5
	} else {
		req.session.right = right
		req.session.wrong = wrong? parseInt(wrong) + 1: 1
		req.session.score = score? parseInt(score)>5? parseInt(score)- 5: 0: 0
	}
	req.session.time = time

	res.redirect(`/quiz?id=${id}`)
})

module.exports = router;