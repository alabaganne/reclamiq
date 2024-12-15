const router = require('express').Router();
const Municipality = require('../models/municipality');
const State = require('../models/state');

router.get('/', async (req, res) => {
	try {
		const states = await State.find();
		res.json(states);
	} catch(err) {
		res.status(500).send('Failed to get states');
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	if(req.body.municipality && req.body.state) {
		// check if the state and municipality exists
		try {
			let state = await State.findOne({name: req.body.state});
			if(!state) {
				state = await State.create({name: req.body.state});
			}
	
			let municipality = await Municipality.findOne({name: req.body.municipality});
			if(!municipality) {
				municipality = await Municipality.create({name: req.body.municipality});
			}
	
			municipality.stateId = state._id;
			await municipality.save();
		} catch(err) {
			res.status(500).send('Failed to assign municipality to state');
			console.log(err);
		}
	}
	else {
		if(!req.body.name){
			return res.status(422).send('state "name" is required');
		}
		// create new state
		try {
			await State.create({name: req.body.name});
		} catch(err) {
			res.status(500).send('Failed to create state');
			console.log(err);
		}
	}
});

module.exports = router;