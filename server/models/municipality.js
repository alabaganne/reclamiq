// a municipality belongs to one state

const mongoose = require("mongoose");

const municipalitySchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	stateId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'State',
		required: false
	}
});

const Municipality = mongoose.model('Municipality', municipalitySchema);

module.exports = Municipality;