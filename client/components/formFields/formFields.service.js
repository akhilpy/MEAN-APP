'use strict';

(function() {

function FormService(appConfig) {
  var roles = appConfig.ROLES;
  var provinces = appConfig.PROVINCES;
  var structures = appConfig.STRUCTURES;
  var industries = appConfig.INDUSTRIES;

  var Form = {


    /**
     * Get Signup Fields
     *
     * @return Array
     */
    getSignup() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.first',
              templateOptions: {
                label: 'First Name',
                placeholder: 'First'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.last',
              templateOptions: {
                label: 'Last Name',
                placeholder: 'Last'
              },
              expressionProperties: {
                'templateOptions.disabled': '!model.name.first'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'email',
              templateOptions: {
                type: 'email',
                label: 'Email Address',
                placeholder: 'name@host.com'
              }
            },
            {
              className: 'flex-1',
              type: 'chosen',
              key: 'role',
              templateOptions: {
                label: 'Type of User',
                labelProp: 'label',
                valueProp: 'value',
                options: roles,
                ngOptions: 'option.name for option in to.options track by option.value',
                placeholder: 'Select'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'password',
              templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Password'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'confirmPassword',
              templateOptions: {
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Password'
              }
            }
          ]
        }
      ];

    },


    /**
     * Get Login Fields
     *
     * @return Array
     */
    getLogin() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'email',
              templateOptions: {
                type: 'email',
                label: 'Email Address',
                placeholder: 'name@host.com'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'password',
              templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Password'
              }
            }
          ]
        }
      ];

    },


    /**
     * Get Investor Profile Fields
     *
     * @return Array
     */
    getInvestorProfile() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'username',
              templateOptions: {
                label: 'Username',
                placeholder: 'username',
                description: 'This name will appear to other users of the site (i.e. joe123, investor111)'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.first',
              templateOptions: {
                label: 'First Name',
                placeholder: 'First'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.last',
              templateOptions: {
                label: 'Last Name',
                placeholder: 'Last'
              },
              expressionProperties: {
                'templateOptions.disabled': '!model.name.first'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'email',
              templateOptions: {
                type: 'email',
                label: 'Email Address',
                placeholder: 'name@host.com'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'phone',
              templateOptions: {
                label: 'Phone',
                placeholder: '###-###-####'
              }
            },
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'dob',
              templateOptions: {
                type: 'date',
                label: 'Date of Birth',
                placeholder: 'mm-dd-yyyy',
                description: 'We need your birth date for validation purposes.'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'social',
              templateOptions: {
                label: 'Social Security Number',
                placeholder: '###',
                description: 'Please provide the last 3 digits of your social security number, this is required for verification purposes.'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-2',
              type: 'input',
              key: 'address.street',
              templateOptions: {
                label: 'Street Address',
                placeholder: ''
              }
            },
            {
              className: 'flex-2',
              type: 'input',
              key: 'address.city',
              templateOptions: {
                label: 'City',
                placeholder: ''
              }
            },
            {
              className: 'flex-1',
              type: 'chosen',
              key: 'address.province',
              templateOptions: {
                label: 'Province',
                labelProp: 'label',
                valueProp: 'value',
                options: provinces,
                ngOptions: 'option.name for option in to.options track by option.value',
                placeholder: 'Select'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'address.postal',
              templateOptions: {
                label: 'Postal Code',
                placeholder: ''
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'investor.increase',
              templateOptions: {
                type: 'checkbox',
                label: 'Request increase to $1500 per offer limit.',
                description: 'Due to securities regulations if you wish to invest more than $1500 in each listing you will need to apply for the appropriate investor status. Please indicate your interest and we will contact you shortly.'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'investor.notifications',
              templateOptions: {
                type: 'checkbox',
                label: 'I wish to be notified when there are new listings.',
                description: 'Opt in to be notified of new listings so that you do not miss out.'
              }
            },
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'textarea',
              key: 'investor.notes',
              templateOptions: {
                label: 'Request',
                description: 'Let us know if there is a type of investment that you are specifically looking for.'
              }
            }
          ]
        }
      ];

    },


    /**
     * Get Borrower Profile Fields
     *
     * @return Array
     */
    getBorrowerProfile() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'username',
              templateOptions: {
                label: 'Username',
                placeholder: 'username'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.first',
              templateOptions: {
                label: 'First Name',
                placeholder: 'First'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'name.last',
              templateOptions: {
                label: 'Last Name',
                placeholder: 'Last'
              },
              expressionProperties: {
                'templateOptions.disabled': '!model.name.first'
              }
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'email',
              templateOptions: {
                type: 'email',
                label: 'Email Address',
                placeholder: 'name@host.com'
              }
            }
          ]
        }
      ];
    },


    /**
     * Get Application Fields
     *
     * @return Array
     */
    getApplicationPage(page) {

      if( page === 1 ) {

        return [
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'businessName',
                templateOptions: {
                  label: 'Registered Business Name',
                  placeholder: '',
                  description: 'Enter registered business name.'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'doingBusinessName',
                templateOptions: {
                  label: 'Doing Business As',
                  placeholder: '',
                  description: 'Provide only if differs from registered name.'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'contactName',
                templateOptions: {
                  label: 'Contact Name',
                  placeholder: '',
                  description: 'Contact name will be displayed on listing (default user name).'
                }
              },
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'email',
                templateOptions: {
                  type: 'email',
                  label: 'Contact Email',
                  placeholder: 'name@host.com',
                  description: 'Email to be displayed on your listing (default user email).'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'phone',
                templateOptions: {
                  label: 'Phone Number',
                  placeholder: '###-###-####',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'website',
                templateOptions: {
                  type: 'url',
                  label: 'Website',
                  placeholder: 'http://',
                  description: ''
                }
              },
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-2',
                type: 'input',
                key: 'address.street',
                templateOptions: {
                  label: 'Street Address',
                  placeholder: ''
                }
              },
              {
                className: 'flex-2',
                type: 'input',
                key: 'address.city',
                templateOptions: {
                  label: 'City',
                  placeholder: ''
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'address.province',
                templateOptions: {
                  label: 'Province',
                  labelProp: 'label',
                  valueProp: 'value',
                  options: provinces,
                  ngOptions: 'option.name for option in to.options track by option.value',
                  placeholder: 'Select'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'address.postal',
                templateOptions: {
                  label: 'Postal Code',
                  placeholder: ''
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'founded',
                templateOptions: {
                  label: 'Company Founded',
                  placeholder: '',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'structure',
                templateOptions: {
                  label: 'Business Structure',
                  labelProp: 'label',
                  valueProp: 'value',
                  options: structures,
                  ngOptions: 'option.name for option in to.options track by option.value',
                  placeholder: 'Select'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'industry',
                templateOptions: {
                  label: 'Industry',
                  labelProp: 'label',
                  valueProp: 'value',
                  options: industries,
                  ngOptions: 'option.name for option in to.options track by option.value',
                  placeholder: 'Select'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'naics',
                templateOptions: {
                  label: 'NAICS Code',
                  placeholder: '',
                  description: 'http://www.naics.com/naics-search-results/'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'employees',
                templateOptions: {
                  label: 'Number of Employees',
                  placeholder: '',
                  description: ''
                }
              }
            ]
          },
        ];

      } else if( page === 2 ) {

        return [
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'title',
                templateOptions: {
                  label: 'Listing Title',
                  placeholder: '',
                  description: 'The title will be used to promote your listing (i.e “Opening second location of Joe’s coffee”).'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'radio',
                key: 'listingType',
                templateOptions: {
                  label: 'Private or Marketplace Listing',
                  options: [
                    {
                      name: 'Marketplace',
                      value: 'Marketplace'
                    },
                    {
                      name: 'Private',
                      value: 'Private'
                    }
                  ],
                  placeholder: '',
                  description: 'Do you want your listing to be available to the InvestNextDoor community or would you prefer a private listing that will be accessible by your invitation only.'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'usage',
                templateOptions: {
                  label: 'What is the money for?',
                  labelProp: 'label',
                  valueProp: 'value',
                  options: [
                    {
                      name: 'Business Acquisition',
                      value: 'Business Acquisition'
                    },
                    {
                      name: 'Business Ownership Restructure',
                      value: 'Business Ownership Restructure'
                    },
                    {
                      name: 'Expansion Capital',
                      value: 'Expansion Capital'
                    },
                    {
                      name: 'Business Acquisition',
                      value: 'Business Acquisition'
                    },
                    {
                      name: 'Equipment',
                      value: 'Equipment'
                    },
                    {
                      name: 'Inventory',
                      value: 'Inventory'
                    },
                    {
                      name: 'Refinancing/Debt Consolodation',
                      value: 'Refinancing/Debt Consolodation'
                    },
                    {
                      name: 'Working Capital',
                      value: 'Working Capital'
                    }
                  ],
                  ngOptions: 'option.name for option in to.options track by option.value',
                  placeholder: 'Select'
                }
              },
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'term',
                templateOptions: {
                  label: 'How long do you want the loan for?',
                  labelProp: 'label',
                  valueProp: 'value',
                  options: [
                    {
                      name: '6 Months',
                      value: '6 Months'
                    },
                    {
                      name: '9 Months',
                      value: '9 Months'
                    },
                    {
                      name: '1 Year',
                      value: '1 Year'
                    },
                    {
                      name: '2 Years',
                      value: '2 Years'
                    },
                    {
                      name: '3 Years',
                      value: '3 Years'
                    },
                    {
                      name: '4 Years',
                      value: '4 Years'
                    },
                    {
                      name: '5 Years',
                      value: '5 Years'
                    }
                  ],
                  ngOptions: 'option.name for option in to.options track by option.value',
                  placeholder: 'Select'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'amount',
                templateOptions: {
                  label: 'How much do you want to borrow?',
                  placeholder: '$',
                  description: 'How much are you looking to borrower through InvestNextDoor? ($10,000-$250,000)'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'jobs',
                templateOptions: {
                  label: 'Number of Jobs',
                  placeholder: '#',
                  description: 'Enter number of full time jobs created/retained by this funding.'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'loanPartners',
                templateOptions: {
                  label: 'Are you interested in loan for all or a portion of the loan amount from one of our partners?',
                  options: [
                    {
                      name: 'No',
                      value: 'No'
                    },
                    {
                      name: 'Yes',
                      value: 'Yes'
                    }
                  ],
                  placeholder: '',
                  description: 'Our partners can provide access to additional capital sources. If you are looking for more than $50,000 this can provide you with more options.'
                }
              },
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'textarea',
                key: 'reason',
                templateOptions: {
                  label: 'Why are you looking for funding and what impact does it have on the business?',
                  description: 'Include specifics on how the funds will be used.'
                }
              }
            ]
          }
        ];
      }

    },


  };

  return Form;
}

angular.module('investnextdoorCaApp')
  .factory('Form', FormService);

})();
