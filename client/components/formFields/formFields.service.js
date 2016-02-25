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
                placeholder: '(###) ###-####',
                mask: '(999) 999-9999'
              }
            },
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'date',
              key: 'dob',
              templateOptions: {
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
     * Get Listing Fields
     *
     * @return Array
     */
    getListingPage(page) {

      if( page === 'general' ) {

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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                type: 'maskedInput',
                key: 'phone',
                templateOptions: {
                  label: 'Phone Number',
                  placeholder: '(###) ###-####',
                  mask: '(999) 999-9999',
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-2',
                type: 'input',
                key: 'address.city',
                templateOptions: {
                  label: 'City',
                  placeholder: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'address.province',
                templateOptions: {
                  label: 'Province',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: provinces,
                  placeholder: 'Select'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'address.postal',
                templateOptions: {
                  label: 'Postal Code',
                  placeholder: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'date',
                key: 'founded',
                templateOptions: {
                  label: 'Company Founded',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'structure',
                templateOptions: {
                  label: 'Business Structure',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: structures,
                  placeholder: 'Select'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'industry',
                templateOptions: {
                  label: 'Industry',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: industries,
                  placeholder: 'Select'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
        ];

      } else if( page === 'details' ) {

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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'usage',
                templateOptions: {
                  label: 'What is the money for?',
                  labelProp: 'name',
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
                  placeholder: 'Select'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                  labelProp: 'name',
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
                  placeholder: 'Select'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'loanPartners',
                templateOptions: {
                  label: 'May we offer our lending partners your funding request, to broaden your chances of obtaining funding?',
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
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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

      } else if( page === 'financial' ) {

        return [
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'businessNumber',
                templateOptions: {
                  label: 'Business Number (BN)',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'commercialSpace',
                templateOptions: {
                  label: 'Do you own your commercial space?',
                  options: [
                    {
                      name: 'Yes',
                      value: 'Yes'
                    },
                    {
                      name: 'No',
                      value: 'No'
                    }
                  ],
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            key: 'owners',
            type: 'repeatSection',
            templateOptions: {
              label: 'Owners',
              btnText: 'Add Owner',
              fields: [
                {
                  key: 'name',
                  templateOptions: {
                    label: 'Owner Name'
                  },
                  className: 'flex-3',
                  type: 'input',
                },
                {
                  key: 'percentage',
                  templateOptions: {
                    label: 'Owner Percentage'
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'guarantee',
                  templateOptions: {
                    label: 'Will provide a guarantee?',
                    placeholder: 'placeholder',
                    valueProp: 'value',
                    keyProp: 'name',
                    options: [
                      {
                        name: 'Yes',
                        value: 'Yes'
                      },
                      {
                        name: 'No',
                        value: 'No'
                      }
                    ]
                  },
                  className: 'flex-1',
                  type: 'radio'
                }
              ]
            },
            expressionProperties: {
              'templateOptions.disabled': 'formState.disabled'
            }
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'revenue',
                templateOptions: {
                  label: '12 Month Revenue',
                  placeholder: '$',
                  description: 'Please make sure that you enter the revenue from the last 12 months.'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'projection',
                templateOptions: {
                  label: '12 Month Projection',
                  placeholder: '$',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'debt',
                templateOptions: {
                  label: 'Total Outstanding Debt',
                  placeholder: '$',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'repayments',
                templateOptions: {
                  label: 'Debt Payments (Monthly)',
                  placeholder: '$',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'bankStatements',
                templateOptions: {
                  key: 'bankStatements',
                  type: 'input',
                  label: 'Attach Bank Statements (Minimum 3 Months)'
                },
              },
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'taxReturns',
                templateOptions: {
                  key: 'taxReturns',
                  type: 'input',
                  label: 'Attach Business Tax Returns (Last 2 Years)'
                },
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'textarea',
                key: 'whyInvest',
                templateOptions: {
                  label: 'Why should someone invest in your business?',
                  description: 'Share why your business is a great investment.'
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
                key: 'provideMore',
                defaultValue: false,
                templateOptions: {
                  label: 'Additional Financial Information',
                  options: [
                    {
                      name: 'No',
                      value: false
                    },
                    {
                      name: 'Yes',
                      value: true
                    }
                  ],
                  placeholder: '',
                  description: 'Providing additional information may increase investor interest.'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'date',
                key: 'upToDate',
                templateOptions: {
                  label: 'As of Date',
                  placeholder: '',
                  description: 'Date of financial information'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'assets',
                templateOptions: {
                  label: 'Total Assets',
                  placeholder: '$',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'inventory',
                templateOptions: {
                  label: 'Current Inventory',
                  placeholder: '$',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'receivable',
                templateOptions: {
                  label: 'Total Liabilities',
                  placeholder: '$',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'liabilities',
                templateOptions: {
                  label: 'Accounts Receivable',
                  placeholder: '$',
                  description: ''
                }
              },
            ],
            hideExpression: '!model.provideMore || model.provideMore==false'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'financialStatements',
                templateOptions: {
                  label: 'Financial Statements',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: [
                    {
                      name: 'Audited',
                      value: 'Audited'
                    },
                    {
                      name: 'Reviewed',
                      value: 'Reviewed'
                    }
                  ],
                  placeholder: 'Select'
                }
              },
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'additionalDocuments',
                templateOptions: {
                  key: 'additionalDocuments',
                  type: 'input',
                  label: 'Additional Financial Documents',
                  description: 'Attach documents up to 2MB (file names will be displayed) such as business plan, forecasts and financial statements.'
                },
              }
            ],
            hideExpression: '!model.provideMore || model.provideMore==false'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'textarea',
                key: 'additionalInfo',
                templateOptions: {
                  label: 'Additional Information',
                  description: ''
                }
              }
            ],
            hideExpression: '!model.provideMore || model.provideMore==false'
          }

        ];

      } else if( page === 'social' ) {

        return [
          {
            className: 'display-flex',
            key: 'managers',
            type: 'repeatSection',
            templateOptions: {
              label: 'Management Team',
              btnText: 'Add Team Member',
              fields: [
                {
                  key: 'name',
                  templateOptions: {
                    label: 'Name'
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'title',
                  templateOptions: {
                    label: 'Title'
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'linkedin',
                  templateOptions: {
                    label: 'LinkedIn',
                    placeholder: 'http://'
                  },
                  className: 'flex-1',
                  type: 'input'
                }
              ]
            }
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'video',
                templateOptions: {
                  label: 'Feature Video',
                  placeholder: 'http://',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'facebook',
                templateOptions: {
                  label: 'Facebook',
                  placeholder: 'http://',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'twitter',
                templateOptions: {
                  label: 'Twitter',
                  placeholder: 'http://',
                  description: ''
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
                key: 'linkedin',
                templateOptions: {
                  label: 'LinkedIn',
                  placeholder: 'http://',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'youtube',
                templateOptions: {
                  label: 'YouTube',
                  placeholder: 'http://',
                  description: ''
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'yelp',
                templateOptions: {
                  label: 'Yelp',
                  placeholder: 'http://',
                  description: ''
                }
              }
            ]
          },
          {
            className: 'display-flex',
            key: 'reviews',
            type: 'repeatSection',
            templateOptions: {
              label: 'Reviews and Endorsements',
              btnText: 'Add Review or Endorsement',
              fields: [
                {
                  key: 'name',
                  templateOptions: {
                    label: 'Name',
                    description: 'Name of Company/Person'
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'link',
                  templateOptions: {
                    label: 'Link',
                    placeholder: 'http://',
                    description: 'Press, News, Websites'
                  },
                  className: 'flex-1',
                  type: 'input'
                },
                {
                  key: 'review',
                  templateOptions: {
                    label: 'Review'
                  },
                  className: 'flex-2',
                  type: 'textarea',
                }
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'dropzone',
            key: 'images',
            templateOptions: {
              key: 'images',
              type: 'input',
              label: 'Business and Product Images'
            },
          }
        ];

      } else if( page === 'terms' ) {

        return [
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'checkbox',
                key: 'businessAgreements',
                templateOptions: {
                  label: 'I agree to the InvestNextDoor business agreement and terms of service',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'checkbox',
                key: 'authority',
                templateOptions: {
                  label: 'I agree that I have the authority to place this listing and issue the related security. InvestNextDoor is not, and will not act in any intermediary capacity between my business and investors, and that I am wholly responsible for ensuring all legal and regulatory compliance is completed for my security offering.',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'checkbox',
                key: 'moreRequired',
                templateOptions: {
                  label: 'Based on the securities commission regulations of each province I may be required to provide more information.',
                  placeholder: '',
                  description: ''
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'checkbox',
                key: 'certified',
                templateOptions: {
                  label: 'On behalf of the issuer, I certify that the statements made in this listing application and offering document are true. ',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
                key: 'fullName',
                templateOptions: {
                  label: 'Full Legal Name',
                  placeholder: '',
                  description: '(first name, middle name and last name)'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'position',
                templateOptions: {
                  label: 'Position',
                  placeholder: '',
                  description: 'Director, officer, executive or control person of the business.'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'phone',
                templateOptions: {
                  label: 'Phone Number',
                  placeholder: '###-###-####',
                  description: 'Required so that questions may be asked by purchasers and security regulatory authority or regulators.'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'offset-half',
                type: 'input',
                key: 'signature',
                templateOptions: {
                  label: 'Electronic Signature',
                  placeholder: '',
                  description: 'I acknowledge that I am signing this offering document electronically and agree that this is the legal equivalent of my handwritten signature. I will not at any time in the future claim that my electronic signature is not legally binding.'
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
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
