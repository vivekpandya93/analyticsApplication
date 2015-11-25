window.app = angular.module('NamshiBuyingApp', ['ui.router', 'ui.bootstrap']);


app.config(function ($urlRouterProvider, $locationProvider){
	   $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

})

app.run(function ($rootScope, $state, $rootScope, loader) {
	$rootScope.$on('$stateChangeStart', function() {
			loader.show();
	});
})




