'use strict';

angular.module('investnextdoorCaApp', [
  'investnextdoorCaApp.auth',
  'investnextdoorCaApp.admin',
  'investnextdoorCaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'textAngular',
  'formly',
  'formlyBootstrap',
  'ngMask'
])
  .config(function($urlRouterProvider, $locationProvider, formlyConfigProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

<<<<<<< Updated upstream
    var unique = 1;
    formlyConfigProvider.setType({
      name: 'chosen',
      extends: 'select',
      template: '<select chosen="model[options.key]" data-placeholder="Select" class="form-control" disable-search-threshold="15" ng-model="model[options.key]"></select>'
    });

    formlyConfigProvider.setType({
      name: 'repeatSection',
      template: '<div class="formly__repeater--wrapper"><label>{{to.label}}</label><ul class="formly__repeater {{hideRepeat}}"><li class="formly__repeater--section" ng-repeat="element in model[options.key]" ng-init="fields = copyFields(to.fields)"><formly-form fields="fields" model="element" form="form"></formly-form><button type="button" class="formly__repeater--remove" ng-click="model[options.key].splice($index, 1)"><i class="fa fa-times-circle"></i></button></li></ul><button type="button" class="formly__repeater--add" ng-click="addNew()" >{{to.btnText}}</button></div>',
      controller: function($scope) {
        function copyFields(fields) {
          fields = angular.copy(fields);
          addRandomIds(fields);
          return fields;
        }

        function addNew() {
          $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
          var repeatsection = $scope.model[$scope.options.key];
          var lastSection = repeatsection[repeatsection.length - 1];
          var newsection = {};
          if (lastSection) {
            newsection = angular.copy(lastSection);
          }
          repeatsection.push(newsection);
        }

        function addRandomIds(fields) {
          unique++;
          angular.forEach(fields, function(field, index) {
            if (field.fieldGroup) {
              addRandomIds(field.fieldGroup);
              return; // fieldGroups don't need an ID
            }

            if (field.templateOptions && field.templateOptions.fields) {
              addRandomIds(field.templateOptions.fields);
            }

            field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
          });
        }

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        $scope.formOptions = {formState: $scope.formState};
        $scope.addNew = addNew;

        $scope.copyFields = copyFields;
      }
    });
=======
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('chosen'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('repeater'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('dropzone'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('maskedInput'));

>>>>>>> Stashed changes
  });
