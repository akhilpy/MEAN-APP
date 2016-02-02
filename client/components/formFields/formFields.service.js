'use strict';

(function() {

function FormService(appConfig) {
  var roles = appConfig.ROLES;
  var provinces = appConfig.PROVINCES;

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

  };

  return Form;
}

angular.module('investnextdoorCaApp')
  .factory('Form', FormService);

})();
