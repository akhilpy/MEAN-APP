/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Listing from '../api/listing/listing.model';
import Faq from '../api/faq/faq.model';

var newUser = new User({
  provider: 'local',
  role: 'investor',
  name: {
    first: 'Test',
    last: 'Investor'
  },
  email: 'test@investor.com',
  password: 'password'
});

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      role: 'borrower',
      name: {
        first: 'Test',
        last: 'Borrower'
      },
      email: 'test@borrower.com',
      password: 'password'
    },
    newUser,
    {
      provider: 'local',
      role: 'admin',
      name: {
        first: 'Jill',
        last: 'Molloy'
      },
      email: 'development@thesnug.io',
      password: 'password'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

  Listing.find({}).remove()
    .then(() => {
      Listing.create({
        status: 'approved',
        general: {
      		businessName: 'Awesome Business, LLC',
      		doingBusinessName: 'Awesome Business',
      		contactName: 'John Smith',
      		email: 'john@awesomebuisness.com',
      		phone: '(555) 555-5555',
      		website: 'http://www.awesomebuisness.com',
      		address: {
            street: '123 Fake Street',
            city: 'Vancouver',
            province: 'BC',
            postal: '12345'
          },
      		founded: '2000',
      		structure: 'Limited Partnership',
      		industry: 'Professional Services',
      		naics: '123',
      		employees: '100'
      	},
        details: {
      		title: 'Opening Second Location for the Awesome Business',
      		listingType: 'Marketplace',
      		usage: 'Expansion Capital',
      		term: 6,
      		amount: '10000',
      		jobs: '20',
      		loanPartners: 'No',
      		reason: 'Cras mattis consectetur purus sit amet fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum.'
      	},
        financial: {
      		businessNumber: '123',
      		commercialSpace: 'Own',
      		owners: [
            {
              name: 'John Smith',
              percentage: '100%',
              guarantee: 'Yes'
            }
          ],
      		revenue: '500000',
      		projection: '1000000',
      		debt: '10000',
      		repayments: '500',
      		bankStatements: [],
      		taxReturns: [],
      		whyInvest: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.',
      		provideMore: false,
      		upToDate: '',
      		assets: '',
      		inventory: '',
      		receivable: '',
      		liabilities: '',
      		financialStatements: '',
      		additionalDocuments: [],
          additionalInfo: ''
      	},
        social: {
          managers: [
            {
              name: 'Mary Ryan',
              title: 'Public Relations Manager',
              linkedin: 'http://linkedin.com'
            }
          ],
          video: '#',
          facebook: 'http://facebook.com',
          twitter: 'http://twitter.com',
          linkedin: 'http://linkedin.com',
          youtube: 'http://youtube.com',
          yelp: 'http://www.yelp.ca/biz/stone-fox-salon-milwaukee',
          reviews: [
            {
              name: 'Jane Smith',
              title: 'Our First Customer',
              link: '#'
            }
          ],
          images: [
            {
              name: 'Great Picture 1',
              link: 'http://thesn.ug/20vFzrh'
            },
            {
              name: 'Great Picture 2',
              link: 'http://thesn.ug/20vFzrh'
            },
            {
              name: 'Great Picture 3',
              link: 'http://thesn.ug/20vFzrh'
            }
          ]
        },
        terms: {
          businessAgreements: true,
          authority: true,
          moreRequired: true,
          certified: true,
          fullName: 'John Paul Smith',
          position: 'Principal',
          phone: '(555) 555-5555',
          signature: 'John Paul Smith'
        },
        comments: [
          {
            text: 'This business is amazing!',
            user: newUser,
            tags: [
              'Business',
              'Local',
              'Funding'
            ],
            replies: [
              {
                text: 'I really agree with that statement',
                user: newUser
              },
              {
                text: 'Me too!',
                user: newUser
              }
            ]
          },
          {
            text: 'This business is amazing!',
            user: newUser,
            tags: [
              'Business',
              'Local',
              'Funding'
            ],
            replies: [
              {
                text: 'I really agree with that statement',
                user: newUser
              },
              {
                text: 'Me too!',
                user: newUser
              }
            ]
          }
        ]
      },{
        status: 'approved',
        general: {
      		businessName: 'Acme Corporation',
      		doingBusinessName: 'Acme',
      		contactName: 'Bill Jones',
      		email: 'info@acme.com',
      		phone: '(555) 555-5555',
      		website: 'http://www.acme.com',
      		address: {
            street: '123 Acme Street',
            city: 'Vancouver',
            province: 'BC',
            postal: '12345'
          },
      		founded: '2000',
      		structure: 'Federal Cooporation',
      		industry: 'Manufacturing',
      		naics: '345',
      		employees: '1000'
      	},
        details: {
      		title: 'Building a New Factory',
      		listingType: 'Private',
      		usage: 'Expansion Capital',
      		term: 18,
      		amount: '1000000',
      		jobs: '250',
      		loanPartners: 'No',
      		reason: 'Cras mattis consectetur purus sit amet fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum.'
      	},
        financial: {
      		businessNumber: '456',
      		commercialSpace: 'Own',
      		owners: [
            {
              name: 'Bill Jones',
              percentage: '50%',
              guarantee: 'Yes'
            },
            {
              name: 'Bob Jones',
              percentage: '50%',
              guarantee: 'Yes'
            }
          ],
      		revenue: '500000000',
      		projection: '100000000000',
      		debt: '0',
      		repayments: '0',
      		bankStatements: [],
      		taxReturns: [],
      		whyInvest: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.',
      		provideMore: false,
      		upToDate: '',
      		assets: '',
      		inventory: '',
      		receivable: '',
      		liabilities: '',
      		financialStatements: '',
      		additionalDocuments: [],
          additionalInfo: ''
      	},
        social: {
          managers: [
            {
              name: 'Mary Ryan',
              title: 'Public Relations Manager',
              linkedin: 'http://linkedin.com'
            }
          ],
          video: '#',
          facebook: 'http://facebook.com',
          twitter: 'http://twitter.com',
          linkedin: 'http://linkedin.com',
          youtube: 'http://youtube.com',
          yelp: 'http://www.yelp.ca/biz/stone-fox-salon-milwaukee',
          reviews: [
            {
              name: 'Jane Smith',
              title: 'Our First Customer',
              link: '#'
            }
          ],
          images: []
        },
        terms: {
          businessAgreements: true,
          authority: true,
          moreRequired: true,
          certified: true,
          fullName: 'Bill Bob Jones',
          position: 'CEO',
          phone: '(555) 555-5555',
          signature: 'Bill Bob Jones'
        },
        comments: [
          {
            text: 'This business is amazing!',
            user: newUser,
            tags: [
              'Business',
              'Local',
              'Funding'
            ],
            replies: [
              {
                text: 'I really agree with that statement',
                user: newUser
              },
              {
                text: 'Me too!',
                user: newUser
              }
            ]
          },
          {
            text: 'This business is amazing!',
            user: newUser,
            tags: [
              'Business',
              'Local',
              'Funding'
            ],
            replies: [
              {
                text: 'I really agree with that statement',
                user: newUser
              },
              {
                text: 'Me too!',
                user: newUser
              }
            ]
          }
        ]
      })
      .then(() => {
        console.log('finished populating listings');
      });
    });

  Faq.find({}).remove()
    .then(() => {
      Faq.create({
        question: 'What does InvestNextDoor do?',
        answer: '<p>Our goal is to make investing in small businesses a smart and accessible investment option for everyone and provide businesses with access to fair market rates.</p>',
        category: 'General'
      },{
        question: 'What do you offer today?',
        answer: '<p>We are working towards this goal by partnering with leading community capital and credit groups such as Meridian Credit Union and Equifax.  We’ll seek to have conversations with communities across Canada. We want to talk to you about small business borrowing and credit, and how we can be part of making it a community-engaged experience.</p>',
        category: 'Business'
      },{
        question: 'Why does community matter when it comes to small business borrowing?',
        answer: '<p>The economic challenges we have seen show us that small businesses thrive when they have the support of their core market.  That coffee shop you love, the dry cleaner that does your shirts just right, the bakery that has the best treats, all survive because of your support.</p><p>But guess what? The banks can’t love them like you do. It’s nothing personal, but their risk models compare them to the big companies, or the ones with lots of property or cash.  Unfortunately, that leaves small businesses with fewer options</p><p>This means giving businesses another borrowing option, and providing their customers and community, another way to express loyalty.  That starts with creating a level playing field with good information.</p>',
        category: 'Investor'
      })
      .then(() => {
        console.log('finished populating faqs');
      });
    });
