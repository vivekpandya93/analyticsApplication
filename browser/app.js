window.app = angular.module('NamshiBuyingApp', ['ui.router', 'ui.bootstrap']);


app.config(function ($urlRouterProvider, $locationProvider){
	   $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

})

app.run(function ($rootScope, $state, $rootScope, loader, $location) {
	// @TODO: Model for the navbar/home forms
	$rootScope.formSelected = {};


	$rootScope.$on('$stateChangeStart', function() {
			loader.show();

	});
	$rootScope.$on('$stateChangeSuccess', function() {
			angular.extend($rootScope.formSelected, $location.search());
	});
})




