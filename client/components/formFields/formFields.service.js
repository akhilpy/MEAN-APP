'use strict';

(function() {

function FormService(appConfig) {
  var roles = appConfig.ROLES;

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

    }

  };

  return Form;
}

angular.module('investnextdoorCaApp')
  .factory('Form', FormService);

})();
