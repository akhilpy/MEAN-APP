'use strict';

var geocoder = require('node-geocoder')('google', 'http');
var moment = require('moment');
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
		default: 'No'
	},
	address: address,
	dob: Date,
	property: Boolean,
	creditCheck: Boolean,
	email: String,
	score: Number
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
	size: String,
	thumb: String,
	slide: String
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
	submitted: Date,
	approved: Date,
	published: Date,
	funded: Date,
	completed: Date,
	repaid: Date,
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
		businessName: {
			type: String,
			default: ''
		},
		doingBusinessName: String,
		contactName: String,
		email: String,
		phone: Number,
		website: String,
		address: address,
		founded: Date,
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
		if(this.admin.basics.userRate) {
			this.admin.basics.listedRate = this.get('admin.basics.userRate');
		} else {
			this.admin.basics.listedRate = null;
		}
	}

	if(!this.admin.basics.listingType) {
		this.admin.basics.listingType = this.get('details.listingType');
	}
  next();
});

ListingSchema
  .virtual('general.location')
  .get(function() {
		var address = '';

		if(this.general.address.street) {
			address = address + ' ' + this.general.address.street;
		}
		if(this.general.address.city) {
			address = address + ' ' + this.general.address.city;
		}
		if(this.general.address.province) {
			address = address + ' ' + this.general.address.province;
		}
		if(this.general.address.postal) {
			address = address + ' ' + this.general.address.postal;
		}

		if(address !== '') {
			return geocoder.geocode(address)
			.then(data => {
				return data;
			});
		}
  });

	ListingSchema
	  .virtual('admin.basics.deadline')
	  .get(function() {
			if(this.admin.basics.published) {
				var published = new Date(this.admin.basics.published);
				var publishedDate = moment(published);
				var deadline = publishedDate.add(60, 'days');
				return deadline.toDate();
			} else {
				return new Date();
			}
	  });


ListingSchema.set('toJSON', { virtuals: true });

ListingSchema.plugin(autopopulate);
export default mongoose.model('Listing', ListingSchema);
