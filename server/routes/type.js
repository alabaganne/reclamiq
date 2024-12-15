const router = require('express').Router();

const Type = require('../models/type');

router.get('/', async (req, res) => {
	try {
		const types = await Type.find();
		res.json(types);
	} catch(err) {
		res.status(500).send('Failed to get types');
		console.log(err);
	}
});

router.put('/:id', async (req, res) => {
	let {name} = req.body;
	if(!name) {
		return res.status(422).send('name is required');
	}

	name = name.toLowerCase();

	try {
		let type = await Type.findByIdAndUpdate(req.params.id, {name});
		if(!type) {
			return res.status(404).send('type not found');
		}

		return res.status(200).send('type updated');
	} catch(err) {
		res.status(500).send('Failed to update type');
		console.log(err);
	}
})

module.exports = router;
