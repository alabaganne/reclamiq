const router = require('express').Router();
const Municipality = require('../models/municipality');
const State = require('../models/state');

router.get('/', async (req, res) => {
	try {
		const municipalities = await Municipality.find();
		res.json(municipalities);
	} catch(err) {
		res.status(500).send('Failed to get municipalities');
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	if(!req.body.name) {
		return res.status(422).send('municipality "name" is required');
	}

	try {
		await Municipality.create({name: req.body.name});
	} catch(err) {
		res.status(500).send('Failed to create municipality');
		console.log(err);
	}
});

router.put('/:id', async (req, res) => {
	if(req.body.state) {
		// check if the state and municipality exists
		try {
			let state = await State.findOne({name: req.body.state});
			if(!state) {
				state = await State.create({name: req.body.state});
			}

			let municipality = await Municipality.findOneAndUpdate(req.params.id, {stateId: state._id});
			if(!municipality) {
				return res.status(404).send('municipality not found');
			}

			return res.status(200).send('municipality updated');
		} catch(err) {
			res.status(500).send('Failed to assign municipality to state');
			console.log(err);
		}
	} else {
		// update municipality name
		if(!req.body.name) {
			return res.status(422).send('municipality "name" is required');
		}

		try {
			let municipality = await Municipality.findByIdAndUpdate(req.params.id, {name: req.body.name});
			if(!municipality) {
				return res.status(404).send('municipality not found');
			}

			return res.status(200).send('municipality updated');
		} catch(err) {
			res.status(500).send('Failed to update municipality');
			console.log(err);
		}
	}
});

module.exports = router;
