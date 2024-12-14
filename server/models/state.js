// a state can have multiple municipalities

const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
});

const State = mongoose.model('State', stateSchema);

module.exports = State;