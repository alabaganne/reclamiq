const mongoose = require('mongoose');

const reportKeywordSchema = new mongoose.Schema({
	reportId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Report',
		required: true
	},
	keywordId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Keyword',
		required: true
	},
});

reportKeywordSchema.index({ reportId: 1, keywordId: 1 }, { unique: true });

const ReportKeyword = mongoose.model('ReportKeyword', reportKeywordSchema);

module.exports = ReportKeyword;
