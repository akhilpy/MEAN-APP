'use strict';

angular.module('investnextdoorCaApp')
  .provider('formlyFields', function () {

    // Private constructor
    function Config() {
      this.field = function (field) {
        if( field === 'chosen' ) {

          field = {
            name: 'chosen',
            extends: 'select',
            template: '<select chosen="model[options.key]" data-placeholder="Select" disable-search-threshold="15" ng-model="model[options.key]"></select>'
          };
          return field;

        } else if( field === 'date' ) {

          field = {
            name: 'date',
            extends: 'input',
            template: '<input ng-model="model[options.key]" type="date" date-object ui-date ui-date-format>'
          };
          return field;

        } else if( field === 'repeater' ) {

          field = {
            name: 'repeatSection',
            template: '<div class="formly__repeater--wrapper"><label>{{to.label}}</label><ul class="formly__repeater {{hideRepeat}}"><li class="formly__repeater--section" ng-repeat="element in model[options.key] track by $index" ng-init="fields = copyFields(to.fields)"><formly-form fields="fields" model="element" form="form"></formly-form><button type="button" class="formly__repeater--remove" ng-click="model[options.key].splice($index, 1)"><i class="fa fa-times-circle"></i></button></li></ul><button type="button" class="formly__repeater--add" ng-click="addNew()" >{{to.btnText}}</button></div>',
            controller: 'FormlyRepeaterCtrl'
          };
          return field;

        } else if( field === 'dropzone' ) {

          field = {
            name: 'dropzone',
            extends: 'input',
            template: '<ul class="dz-uploaded-files"><li ng-repeat="file in model[options.key] track by $index"><a href="{{file.link}}" target="_blank">{{file.name}}</a> <button class="dz-uploaded-remove" ng-click="model[options.key].splice($index, 1); dropzoneConfig.eventHandlers.removedfile(file)"><i class="fa fa-times-circle"></i></button></li></ul><button class="dropzone-uploader" dropzone="dropzoneConfig">{{dropzoneConfig.options.message}}</button>',
            controller: 'FormlyDropzoneCtrl'
          };
          return field;

        } else if( field === 'maskedInput' ) {

          field = {
            name: 'maskedInput',
            extends: 'input',
            defaultOptions: {
              ngModelAttrs: { // this is part of the magic... It's a little complex, but super powerful
                mask: { // the key "ngMask" must match templateOptions.ngMask
                  attribute: 'mask' // this the name of the attribute to be applied to the ng-model in the template
                },
                // applies the 'clean' attribute with the value of "true"
                'true': { value: 'clean' }
              },
              // this is how you hook into formly's messages API
              // however angular-formly doesn't ship with ng-messages.
              // You have to display these messages yourself.
              validation: {
                messages: {
                  mask: '"Invalid input"'
                }
              }
            }
          };
          return field;

        }
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Config();
    };
  });
