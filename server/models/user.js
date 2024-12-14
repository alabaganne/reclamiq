const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	cin: {
		type: String,
		length: 8,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	municipalityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Municipality',
		required: true
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
