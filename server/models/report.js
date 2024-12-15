const mongoose = require('mongoose');
const Municipality = require('./municipality');

const reportSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	text: {
		type: String,
		required: true
	},
	municipalityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Municipality',
		required: true
	},
	typeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Type',
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
