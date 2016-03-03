'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import {Schema} from 'mongoose';
import User from '../user/user.model';

var autopopulate = require('mongoose-autopopulate');
var shortid = require('shortid');

var address = {
	street: String,
	city: String,
	province: String,
	postal: String
};

var owners = {
	name: {
		type: String,
		default: ''
	},
	percentage: {
		type: String,
		default: ''
	},
	guarantee: {
		type: String,
		default: ''
	}
};

var managers = {
	name: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	linkedin: {
		type: String,
		default: ''
	}
};

var reviews = {
	name: {
		type: String,
		default: ''
	},
	review: {
		type: String,
		default: ''
	},
	link: {
		type: String,
		default: ''
	}
};

var reply = {
	text: {
		type: String,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		autopopulate: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}

var comment = {
	title: {
		type: String,
		default: ''
	},
	text: {
		type: String,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		autopopulate: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	tags: [String],
	replies: [reply]
}

var requester = {
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		autopopulate: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}

var file = {
	name: String,
	link: String,
	size: String
}

var ListingSchema = new Schema({
  id: {
    type: String,
    default: shortid.generate,
    unique: true
  },
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'in-progress'
	},
	general: {
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
	details: {
		title: String,
		listingType: {
			type: String,
			default: 'Marketplace'
		},
		usage: String,
		term: Number,
		amount: String,
		jobs: String,
		loanPartners: {
			type: String,
			default: 'Yes'
		},
		reason: String
	},
	financial: {
		businessNumber: String,
		commercialSpace: {
			type: String,
			default: 'No'
		},
		owners: [owners],
		revenue: String,
		projection: String,
		debt: String,
		repayments: String,
		bankStatements: [file],
		taxReturns: [file],
		whyInvest: String,
		provideMore: {
			type: Boolean,
			default: false
		},
		upToDate: Date,
		assets: String,
		inventory: String,
		receivable: String,
		liabilities: String,
		financialStatements: String,
		additionalDocuments: [file],
    additionalInfo: String
	},
	social: {
		managers: [managers],
		video: String,
		facebook: String,
		twitter: String,
		linkedin: String,
		youtube: String,
		yelp: String,
		reviews: [reviews],
		images: [file]
	},
	terms: {
		businessAgreements: {
			type: Boolean,
			default: false
		},
		authority: {
			type: Boolean,
			default: false
		},
		moreRequired: {
			type: Boolean,
			default: false
		},
		certified: {
			type: Boolean,
			default: false
		},
		fullName: String,
		position: String,
		phone: String,
		signature: String
	},
	comments: [comment],
	infoRequest: [requester]
});

ListingSchema.plugin(autopopulate);
export default mongoose.model('Listing', ListingSchema);
