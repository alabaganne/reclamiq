const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const mongoose = require('mongoose');
const Municipality = require('./models/municipality');
const User = require('./models/user');
const Type = require('./models/type');
const Report = require('./models/report');
const Keyword = require('./models/keyword');
const ReportKeyword = require('./models/reportKeyword');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// request body will have the following fields:
// municipality, fullName, cin, phoneNumber, email, type, text, keywords
app.post('/', async (req, res) => {
	if(!req.body.municipality || !req.body.fullName || !req.body.cin || !req.body.phoneNumber || !req.body.email || !req.body.type || !req.body.text || !req.body.keywords) {
		return res.status(422).send('missing required fields');
	}

	try {
		req.body.municipality = req.body.municipality.toLowerCase();

		// report will contain the following fields: id, text, municipalityId, typeId, userId
		let municipality = await Municipality.findOne({name: req.body.municipality})
		if(!municipality) {
			municipality = await Municipality.create({name: req.body.municipality});
		}
	
		let user = await User.findOne({cin: req.body.cin});
		if(!user) {
			user = await User.create({
				fullName: req.body.fullName,
				cin: req.body.cin,
				phoneNumber: req.body.phoneNumber,
				email: req.body.email,
				municipalityId: municipality._id
			})
		}
	
		let type = await Type.findOne({name: req.body.type});
		if(!type) {
			type = await Type.create({name: req.body.type});
		}
	
		const report = await Report.create({
			text: req.body.text,
			municipalityId: municipality._id,
			typeId: type._id,
			userId: user._id
		});
	
		// get keywords where name in req.body.keywords
		const keywords = await Keyword.find({name: {$in: req.body.keywords}});
		// if a keyword not found, create it
		const keywordsToCreate = req.body.keywords.filter(keyword => !keywords.find(k => k.name === keyword));
		const createdKeywords = await Keyword.create(keywordsToCreate.map(keyword => ({name: keyword})));
		// add the created keywords to the keywords array
		keywords.push(...createdKeywords);
	
		// create the reportKeywords array
		const reportKywords = keywords.map(keyword => ({
			reportId: report._id,
			keywordId: keyword._id
		}));
	
		// insert the reportKeywords array into the ReportKeyword collection
		await ReportKeyword.insertMany(reportKywords);

		res.status(201).send('Created');
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to create report');
	}
});

app.get('/', async (req, res) => {
	try {
		const reports = await Report.find().populate('municipalityId').populate('typeId').populate('userId').exec();
		res.status(200).send(reports);
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to get reports');
	}
});

app.get('/:id', async (req, res) => {
	try {
		const report = await Report.findById(req.params.id).populate('municipalityId').populate('typeId').populate('userId').exec();
		res.status(200).send(report);
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to get report');
	}
});

app.delete('/:id', async (req, res) => {
	try {
		await Report.findByIdAndDelete(req.params.id);
		res.status(200).send('Deleted');
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to delete report');
	}
});

mongoose.connect(process.env.DATABASE_URI).then(() => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => {
		console.log('Server is running on port ' + PORT);
	});
}).catch(error => {
	console.log(error);
});

