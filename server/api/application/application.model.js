'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

var shortid = require('shortid');

var address = {
	street: String,
	city: String,
	province: String,
	postal: String
};

var owners = {
	name: String,
	percentage: String,
	guarantee: String
};

var managers = {
	name: String,
	title: String,
	linkedin: String
};

var reviews = {
	name: String,
	review: String,
	link: String
};

var ApplicationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: shortid.generate,
    unique: true
  },
	date: {
		type: Date,
		default: Date.now
	},
	generalInfo: {
		businessName: String,
		doingBusinessName: String,
		contactName: String,
		email: String,
		phone: String,
		website: String,
		address: address,
		founded: String,
		structure: String,
		industry: String,
		naics: String,
		employees: String
	},
	listingDetails: {
		title: String,
		listingType: String,
		usage: String,
		term: String,
		amount: String,
		jobs: String,
		loanPartners: String,
		reason: String
	},
	financial: {
		businessNumber: String,
		commercialSpace: String,
		owners: [owners],
		revenue: String,
		projection: String,
		debt: String,
		repayments: String,
		bankStatements: [],
		taxReturns: [],
		whyInvest: String,
		provideMore: Boolean,
		upToDate: Date,
		assets: String,
		inventory: String,
		receivable: String,
		liabilities: String,
		financialStatements: String,
		additionalDocuments: [],
    additionalInfo: String
	},
	socialMedia: {
		managers: [managers],
		video: String,
		facebook: String,
		twitter: String,
		linkedin: String,
		youtube: String,
		yelp: String,
		reviews: [reviews],
		images: []
	},
	terms: {
		businessAgreements: Boolean,
		authority: Boolean,
		moreRequired: Boolean,
		certified: Boolean,
		fullName: String,
		position: String,
		phone: String,
		signature: String
	}
});

export default mongoose.model('Application', ApplicationSchema);
