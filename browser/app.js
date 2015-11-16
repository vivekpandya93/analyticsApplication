window.app = angular.module('NamshiBuyingApp', ['ui.router', 'ui.bootstrap']);


app.config(function ($urlRouterProvider, $locationProvider){
	   $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

})


//1. config, run, directives, controller, link functions
// app.run(function ($rootScope, $state) {
//    	//reserve for authentication 
//   })




