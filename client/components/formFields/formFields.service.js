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
                labelProp: 'name',
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
              type: 'maskedInput',
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
                placeholder: '',
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
                labelProp: 'name',
                valueProp: 'value',
                options: provinces,
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
              key: 'investor.requests',
              templateOptions: {
                label: 'Request',
                description: 'Let us know if there is a type of investment that you are specifically looking for.'
              }
            },
            {
              className: 'flex-1',
              type: 'dropzone',
              key: 'attachments',
              templateOptions: {
                kye: 'attachments',
                type: 'input',
                label: 'Attach any Relevant Supporting Documentation.'
              },
            }
          ]
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'oldPassword',
              name: 'password',
              templateOptions: {
                type: 'password',
                label: 'Current Password',
                placeholder: '',
                description: 'You only need to enter your password if you wish to update it.'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'newPassword',
              templateOptions: {
                type: 'password',
                label: 'New Password',
                placeholder: ''
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'confirmPassword',
              templateOptions: {
                type: 'password',
                label: 'Confirm New Password',
                placeholder: ''
              }
            }
          ]
        }
      ];

    },



    /**
     * Get Investor Admin Fields
     *
     * @return Array
     */
    getInvestorAdmin() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'chosen',
              key: 'newRole',
              templateOptions: {
                label: 'Role',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Borrower',
                    value: 'borrower'
                  },
                  {
                    name: 'Investor',
                    value: 'investor'
                  },
                  {
                    name: 'Affiliate',
                    value: 'affiliate'
                  },
                  {
                    name: 'Admin',
                    value: 'admin'
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
              type: 'chosen',
              key: 'investor.status',
              templateOptions: {
                label: 'Status',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Inactive',
                    value: 'Inactive'
                  },
                  {
                    name: 'Active',
                    value: 'Active'
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
              type: 'chosen',
              key: 'investor.level',
              templateOptions: {
                label: 'Level',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Standard',
                    value: 'Standard'
                  },
                  {
                    name: 'Accredited - Unverified',
                    value: 'Accredited - Unverified'
                  },
                  {
                    name: 'Accredited - Verified',
                    value: 'Accredited - Verified'
                  },
                  {
                    name: 'Institution',
                    value: 'Institution'
                  },
                  {
                    name: 'Out of Province',
                    value: 'Out of Province'
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
              type: 'input',
              key: 'investor.limit',
              templateOptions: {
                type: 'number',
                label: 'Limit',
                placeholder: '$'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'investor.maximum',
              templateOptions: {
                type: 'number',
                label: 'Maximum Bid',
                placeholder: '$'
              }
            }
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
                label: 'Notes',
                description: ''
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
        },
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'oldPassword',
              name: 'password',
              templateOptions: {
                type: 'password',
                label: 'Current Password',
                placeholder: '',
                description: 'You only need to enter your password if you wish to update it.'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'newPassword',
              templateOptions: {
                type: 'password',
                label: 'New Password',
                placeholder: ''
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'confirmPassword',
              templateOptions: {
                type: 'password',
                label: 'Confirm New Password',
                placeholder: ''
              }
            }
          ]
        }
      ];
    },


    /**
     * Get Borrower Admin Fields
     *
     * @return Array
     */
    getBorrowerAdmin() {
      return [
        {
          className: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'chosen',
              key: 'newRole',
              defaultValue: 'borrower',
              templateOptions: {
                label: 'Role',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Borrower',
                    value: 'borrower'
                  },
                  {
                    name: 'Investor',
                    value: 'investor'
                  },
                  {
                    name: 'Affiliate',
                    value: 'affiliate'
                  },
                  {
                    name: 'Admin',
                    value: 'admin'
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
              type: 'chosen',
              key: 'borrower.status',
              templateOptions: {
                label: 'Status',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Inactive',
                    value: 'Inactive'
                  },
                  {
                    name: 'Active',
                    value: 'Active'
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
              type: 'chosen',
              key: 'borrower.level',
              templateOptions: {
                label: 'Level',
                labelProp: 'name',
                valueProp: 'value',
                options: [
                  {
                    name: 'Standard',
                    value: 'Standard'
                  }
                ],
                placeholder: 'Select'
              },
              expressionProperties: {
                'templateOptions.disabled': 'formState.disabled'
              }
            },
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
                  description: 'Enter registered business name.',
                  addonLeft: {
                    class: 'fa fa-building'
                  }
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
                  description: 'Provide only if differs from registered name.',
                  addonLeft: {
                    class: 'fa fa-building-o'
                  }
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
                  description: 'Contact name will be displayed on listing (default user name).',
                  addonLeft: {
                    class: 'fa fa-user'
                  }
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
                  description: 'Email to be displayed on your listing (default user email).',
                  addonLeft: {
                    class: 'fa fa-envelope'
                  }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-phone'
                  }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-globe'
                  }
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
                  placeholder: '',
                  addonLeft: {
                    class: 'fa fa-map-marker'
                  }
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
                  placeholder: '',
                  addonLeft: {
                    class: 'fa fa-map-marker'
                  }
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
                  placeholder: '',
                  addonLeft: {
                    class: 'fa fa-map-marker'
                  }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-calendar'
                  }
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
                  description: 'http://www.naics.com/naics-search-results/',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                  type: 'number',
                  label: 'Number of Employees',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                      value: 6
                    },
                    {
                      name: '9 Months',
                      value: 9
                    },
                    {
                      name: '12 Months',
                      value: 12
                    },
                    {
                      name: '24 Months',
                      value: 24
                    },
                    {
                      name: '36 Months',
                      value: 36
                    },
                    {
                      name: '48 Months',
                      value: 48
                    },
                    {
                      name: '60 Months',
                      value: 60
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
                  type: 'number',
                  label: 'How much do you want to borrow?',
                  placeholder: '',
                  description: 'How much are you looking to borrower through InvestNextDoor? ($10,000-$250,000)',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  type: 'number',
                  label: 'Number of Jobs',
                  placeholder: '',
                  description: 'Enter number of full time jobs created/retained by this funding.',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                    label: 'Owner Name',
                    addonLeft: {
                      class: 'fa fa-user'
                    }
                  },
                  className: 'flex-3',
                  type: 'input',
                },
                {
                  key: 'percentage',
                  templateOptions: {
                    type: 'number',
                    label: 'Owner Percentage',
                    addonLeft: {
                      class: 'fa fa-percent'
                    }
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
                  type: 'number',
                  label: '12 Month Revenue',
                  placeholder: '',
                  description: 'Please make sure that you enter the revenue from the last 12 months.',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  type: 'number',
                  label: '12 Month Projection',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  type: 'number',
                  label: 'Total Outstanding Debt',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  type: 'number',
                  label: 'Debt Payments (Monthly)',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  description: 'Date of financial information',
                  addonLeft: {
                    class: 'fa fa-calendar'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'assets',
                templateOptions: {
                  label: 'Total Assets',
                  type: 'number',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'inventory',
                templateOptions: {
                  type: 'number',
                  label: 'Current Inventory',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'receivable',
                templateOptions: {
                  type: 'number',
                  label: 'Total Liabilities',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'liabilities',
                templateOptions: {
                  type: 'number',
                  label: 'Accounts Receivable',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                  label: 'Additional Financial Documents'
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
                    label: 'Name',
                    addonLeft: {
                      class: 'fa fa-user'
                    }
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'title',
                  templateOptions: {
                    label: 'Title',
                    addonLeft: {
                      class: 'fa fa-briefcase'
                    }
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'linkedin',
                  templateOptions: {
                    label: 'LinkedIn',
                    placeholder: 'http://',
                    addonLeft: {
                      class: 'fa fa-linkedin'
                    }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-globe'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'facebook',
                templateOptions: {
                  label: 'Facebook',
                  placeholder: 'http://',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-facebook'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'twitter',
                templateOptions: {
                  label: 'Twitter',
                  placeholder: 'http://',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-twitter'
                  }
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
                  description: '',
                  addonLeft: {
                    class: 'fa fa-linkedin'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'youtube',
                templateOptions: {
                  label: 'YouTube',
                  placeholder: 'http://',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-youtube'
                  }
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'yelp',
                templateOptions: {
                  label: 'Yelp',
                  placeholder: 'http://',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-yelp'
                  }
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
                    description: 'Name of Company/Person',
                    addonLeft: {
                      class: 'fa fa-user'
                    }
                  },
                  className: 'flex-1',
                  type: 'input',
                },
                {
                  key: 'title',
                  templateOptions: {
                    label: 'Title/Location',
                    placeholder: 'Manager',
                    description: 'Press, News, Websites',
                    addonLeft: {
                      class: 'fa fa-briefcase'
                    }
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
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'logo',
                templateOptions: {
                  key: 'logo',
                  type: 'input',
                  label: 'Business Logo',
                  maxFiles: 1
                },
              },
              {
                className: 'flex-2',
                type: 'dropzone',
                key: 'images',
                templateOptions: {
                  key: 'images',
                  type: 'input',
                  label: 'Business and Product Images'
                },
              }
            ]
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
                  description: '(first name, middle name and last name)',
                  addonLeft: {
                    class: 'fa fa-user'
                  }
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
                  description: 'Director, officer, executive or control person of the business.',
                  addonLeft: {
                    class: 'fa fa-briefcase'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'maskedInput',
                key: 'phone',
                templateOptions: {
                  label: 'Phone Number',
                  placeholder: '###-###-####',
                  mask: '(999) 999-9999',
                  description: 'Required so that questions may be asked by purchasers and security regulatory authority or regulators.',
                  addonLeft: {
                    class: 'fa fa-phone'
                  }
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
                  description: 'I acknowledge that I am signing this offering document electronically and agree that this is the legal equivalent of my handwritten signature. I will not at any time in the future claim that my electronic signature is not legally binding.',
                  addonLeft: {
                    class: 'fa fa-paint-brush'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          }
        ];

      } else if(page === 'admin') {

        return [
          {
            noFormControl: true,
            template: '<h3 class="form-subtitle">General</h3>'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'basics.status',
                templateOptions: {
                  label: 'Status',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: [
                    {
                      name: 'In Progress',
                      value: 'in-progress'
                    },
                    {
                      name: 'Pending Review',
                      value: 'review'
                    },
                    {
                      name: 'Approved',
                      value: 'approved'
                    },
                    {
                      name: 'Active',
                      value: 'active'
                    },
                    {
                      name: 'Closed',
                      value: 'closed'
                    }
                  ],
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'basics.stage',
                templateOptions: {
                  label: 'Stage',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: [
                    {
                      name: 'Open',
                      value: 'open'
                    },
                    {
                      name: 'Funding Pending',
                      value: 'funding-pending'
                    },
                    {
                      name: 'Funding Complete',
                      value: 'funding-complete'
                    },
                    {
                      name: 'Repayment Complete',
                      value: 'repayment-complete'
                    },
                    {
                      name: 'Expired',
                      value: 'expired'
                    },
                    {
                      name: 'Cancelled',
                      value: 'cancelled'
                    },
                    {
                      name: 'Rejected',
                      value: 'rejected'
                    }
                  ],
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'chosen',
                key: 'basics.listingType',
                templateOptions: {
                  label: 'Type',
                  labelProp: 'name',
                  valueProp: 'value',
                  options: [
                    {
                      name: 'Private',
                      value: 'Private'
                    },
                    {
                      name: 'Marketplace',
                      value: 'Marketplace'
                    },
                    {
                      name: 'Private Network',
                      value: 'Private Network'
                    },
                    {
                      name: 'Restricted',
                      value: 'Restricted'
                    }
                  ],
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'date',
                key: 'basics.published',
                templateOptions: {
                  label: 'Listing Start',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-calendar'
                  }
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
                key: 'basics.investment.max',
                templateOptions: {
                  type: 'number',
                  label: 'Maximum Investment',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.investment.min',
                templateOptions: {
                  type: 'number',
                  label: 'Minimum Investment',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.eligibility',
                templateOptions: {
                  type: 'number',
                  label: 'Institutional Eligibility',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.benchmarkRate',
                templateOptions: {
                  type: 'number',
                  label: 'Benchmark Rate',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-percent'
                  }
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
                key: 'basics.latePenalty',
                templateOptions: {
                  type: 'number',
                  label: 'Late Payment Penalty',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.finappsID',
                templateOptions: {
                  type: 'number',
                  label: 'FinApps ID',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.creditID',
                templateOptions: {
                  type: 'number',
                  label: 'Credit ID',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'basics.reviewedBy',
                templateOptions: {
                  type: 'text',
                  label: 'Reviewed by',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-user'
                  }
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
                type: 'textarea',
                key: 'basics.notes',
                templateOptions: {
                  label: 'Notes',
                  description: ''
                }
              }
            ]
          },
          {
            noFormControl: true,
            template: '<hr class="form-break"><h3 class="form-subtitle">Underwriting</h3>'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'underwriting.creditReport',
                templateOptions: {
                  key: 'files',
                  type: 'input',
                  label: 'Credit report(s)'
                },
              },
              {
                className: 'flex-1',
                type: 'dropzone',
                key: 'underwriting.underwritingReport',
                templateOptions: {
                  key: 'files',
                  type: 'input',
                  label: 'Underwriting report'
                },
              }
            ]
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'radio',
                key: 'underwriting.taxReturns',
                templateOptions: {
                  label: 'Tax returns provided',
                  options: [
                    {
                      name: 'No',
                      value: 'No'
                    },
                    {
                      name: 'Yes',
                      value: 'Yes'
                    },
                    {
                      name: 'N/A',
                      value: 'N/A'
                    }
                  ],
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'underwriting.bankStatements',
                templateOptions: {
                  label: 'Bank statements',
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
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'underwriting.firstLien',
                templateOptions: {
                  label: 'First lien position on the Note',
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
                type: 'radio',
                key: 'underwriting.bankruptcies',
                templateOptions: {
                  label: 'Bankruptcies in last 6 years',
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
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'underwriting.taxLiens',
                templateOptions: {
                  label: 'Tax Liens',
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
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'underwriting.legalProceedings',
                templateOptions: {
                  label: 'Legal judgments or current proceedings',
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
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            noFormControl: true,
            template: '<hr class="form-break"><h3 class="form-subtitle">Scores</h3>'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.ci',
                templateOptions: {
                  type: 'number',
                  label: 'CI Score',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.pi',
                templateOptions: {
                  type: 'number',
                  label: 'PI Score',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.cds',
                templateOptions: {
                  type: 'number',
                  label: 'Probability of Default (CDS Score)',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.bfrs',
                templateOptions: {
                  type: 'number',
                  label: 'Probability of Business Failure (BFRS Score)',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                key: 'scores.paynet',
                templateOptions: {
                  type: 'number',
                  label: 'Paynet Score',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.tbill',
                templateOptions: {
                  type: 'number',
                  label: 'T-Bill Rate',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'radio',
                key: 'scores.proxy',
                templateOptions: {
                  label: 'Proxy Score',
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
                key: 'scores.bond',
                templateOptions: {
                  type: 'number',
                  label: 'Bond Yield',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.rating',
                templateOptions: {
                  type: 'text',
                  label: 'Credit Rating',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.indFactor',
                templateOptions: {
                  type: 'number',
                  label: 'IND Factor',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
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
                key: 'scores.fico.average',
                templateOptions: {
                  type: 'number',
                  label: 'Average Owner FICO',
                  placeholder: '',
                  description: ''
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.fico.highest',
                templateOptions: {
                  type: 'text',
                  label: 'Highest Owner FICO',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'scores.fico.lowest',
                templateOptions: {
                  type: 'number',
                  label: 'Lowest Owner FICO',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            noFormControl: true,
            template: '<hr class="form-break"><h3 class="form-subtitle">Financials</h3>'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'financials.creditExposure',
                templateOptions: {
                  type: 'number',
                  label: 'Total Current Credit Exposure',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-percent'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'financials.loanRatio',
                templateOptions: {
                  type: 'number',
                  label: 'Loan to New Revenue Ratio',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'financials.debtRatio',
                templateOptions: {
                  type: 'number',
                  label: 'Debt/Revenue Ratio',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              }
            ]
          },
          {
            noFormControl: true,
            template: '<hr class="form-break"><h3 class="form-subtitle">Bank Statements</h3>'
          },
          {
            className: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-1',
                type: 'input',
                key: 'bankStatements.balance',
                templateOptions: {
                  type: 'number',
                  label: 'Current Balance',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'bankStatements.deposits',
                templateOptions: {
                  type: 'number',
                  label: '90 Day Deposits',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'bankStatements.expenses',
                templateOptions: {
                  type: 'number',
                  label: '90 Day Expenses',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
                key: 'bankStatements.leftover',
                templateOptions: {
                  type: 'number',
                  label: '90 Day Leftover',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'bankStatements.cashFlow',
                templateOptions: {
                  type: 'number',
                  label: 'Average Free Cash Flow ratio',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-hashtag'
                  }
                },
                expressionProperties: {
                  'templateOptions.disabled': 'formState.disabled'
                }
              },
              {
                className: 'flex-1',
                type: 'input',
                key: 'bankStatements.income',
                templateOptions: {
                  type: 'number',
                  label: 'Estimated Annual Income',
                  placeholder: '',
                  description: '',
                  addonLeft: {
                    class: 'fa fa-usd'
                  }
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
