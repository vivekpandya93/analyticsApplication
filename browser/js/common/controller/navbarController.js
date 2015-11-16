app.controller('navbarController', function($state, $scope, homeFactory, dataService){
	  homeFactory.getBuyerInfo().then(function(name){
	  		$scope.name = name;
	  })
})