const router = require('express').Router();

const User = require('../models/user');

// get users data
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch(err) {
		res.status(500).send('Failed to get users');
		console.log(err);
	}
});

module.exports = router;
