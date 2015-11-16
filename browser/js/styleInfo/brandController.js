app.controller('brandController', function($state, $scope, homeFactory, one_brand){
	console.log("one_brand:", one_brand)
		$scope.brandInfo = one_brand;
		console.log('were here and::-->', $scope.brandInfo);
})