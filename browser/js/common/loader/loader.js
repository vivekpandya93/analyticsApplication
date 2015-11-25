'use strict';
/* global app */
app.directive('loader', function(loader) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/loader/loader.html',
    link: function(scope){
    	scope.loader = loader;
    }
  };
});