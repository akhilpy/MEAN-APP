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
            template: '<select chosen="model[options.key]" data-placeholder="Select" class="form-control" disable-search-threshold="15" ng-model="model[options.key]"></select>'
          };
          return field;

        } else if( field === 'repeater' ) {

          field = {
            name: 'repeatSection',
            template: '<div class="formly__repeater--wrapper"><label>{{to.label}}</label><ul class="formly__repeater {{hideRepeat}}"><li class="formly__repeater--section" ng-repeat="element in model[options.key]" ng-init="fields = copyFields(to.fields)"><formly-form fields="fields" model="element" form="form"></formly-form><button type="button" class="formly__repeater--remove" ng-click="model[options.key].splice($index, 1)"><i class="fa fa-times-circle"></i></button></li></ul><button type="button" class="formly__repeater--add" ng-click="addNew()" >{{to.btnText}}</button></div>',
            controller: 'FormlyFieldsCtrl'
          }
          return field;
          
        }
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Config();
    };
  });
