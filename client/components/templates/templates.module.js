'use strict';

angular.module('investnextdoorCaApp.templates', [])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('dialog.default', '<div class="general-content__section dialog"><header class="general-content__section--header"><h3 class="general-content__section--title">{{dialogModel.title}}</h3></header><p ng-show="dialogModel.message">{{dialogModel.message}}</p></div>');
}]);
