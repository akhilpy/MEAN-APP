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
		type: Number,
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
	title: {
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
	},
	status: {
		type: String,
		default: 'Pending'
	}
}

var file = {
	name: String,
	link: String,
	size: String
};

var basics = {
	status: {
		type: String,
		default: 'in-progress'
	},
	stage: {
		type: String,
		default: 'open'
	},
	listingType: String,
	published: Date,
	deadline: Date,
	investment: {
		max: {
			type: Number,
			default: 50000
		},
		min: {
			type: Number,
			default: 500
		}
	},
	eligibility: Number,
	benchmarkRate: {
		type: Number,
		default: 6
	},
	userRate: Number,
	listedRate: Number,
	latePenalty: Number,
	finappsID: Number,
	creditID: Number,
	reviewedBy: String,
	notes: String
};

var underwriting = {
	creditReport: {
		type: String,
		default: ''
	},
	underwritingReport: String,
	taxReturns: {
		type: String,
		default: 'No'
	},
	bankStatements: {
		type: String,
		default: 'No'
	},
	firstLien: {
		type: String,
		default: 'No'
	},
	bankruptcies: {
		type: String,
		default: 'No'
	},
	taxLiens: {
		type: String,
		default: 'No'
	},
	legalProceedings: {
		type: String,
		default: 'No'
	}
};

var scores = {
	ci: Number,
	pi: Number,
	cds: Number,
	bfrs: {
		type: Number,
		default: 0
	},
	paynet: Number,
	proxy: {
		type: String,
		default: 'No'
	},
	tbill: Number,
	bond: Number,
	rating: {
		type: String,
		default: ''
	},
	indFactor: Number,
	fico: {
		average: Number,
		highest: Number,
		lowest: Number
	}
}

var financials = {
	creditExposure: {
		type: Number,
		default: ''
	},
	loanRatio: Number,
	debtRatio: Number
}

var bankStatements = {
	balance: {
		type: Number,
		default: 0
	},
	deposits: Number,
	expenses: Number,
	leftover: Number,
	cashFlow: {
		type: Number,
		default: 0
	},
	income: Number
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
	general: {
		businessName: String,
		doingBusinessName: String,
		contactName: String,
		email: String,
		phone: Number,
		website: String,
		address: address,
		founded: {
			type: Date,
			default: Date.now
		},
		structure: String,
		industry: String,
		naics: String,
		employees: Number
	},
	details: {
		title: String,
		listingType: {
			type: String,
			default: 'Marketplace'
		},
		usage: String,
		term: Number,
		amount: Number,
		jobs: Number,
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
		revenue: {
			type: Number,
			value: 0
		},
		projection: Number,
		debt: Number,
		repayments: Number,
		bankStatements: [file],
		taxReturns: [file],
		whyInvest: String,
		provideMore: {
			type: Boolean,
			default: false
		},
		upToDate: Date,
		assets: Number,
		inventory: Number,
		receivable: Number,
		liabilities: Number,
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
		logo: [file],
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
		phone: Number,
		signature: String
	},
	comments: [comment],
	infoRequest: [requester],
	admin: {
		basics: basics,
		underwriting: underwriting,
		scores: scores,
		financials: financials,
		bankStatements: bankStatements
	},
	agreements: {
		loan: {
			signature: {
				type: String,
				default: ''
			}
		}
	}
});

ListingSchema.pre('save', function (next) {

	if(!this.admin.basics.listedRate) {
		this.admin.basics.listedRate = this.get('admin.basics.benchmarkRate');
	}

	if(!this.admin.basics.listingType) {
		this.admin.basics.listingType = this.get('details.listingType');
	}

	if(this.admin.basics.published) {
		var published = this.admin.basics.published;
		var deadline = new Date();
		deadline.setDate(published.getDate() + 60);
		this.admin.basics.deadline = deadline;
	}

  next();
});

ListingSchema.plugin(autopopulate);
export default mongoose.model('Listing', ListingSchema);
