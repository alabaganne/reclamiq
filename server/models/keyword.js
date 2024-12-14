const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	}
});

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;