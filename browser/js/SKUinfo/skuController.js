app.controller('skuController', function($state, $scope, homeFactory, one_sku){
	console.log("one_sku:", one_sku)
		$scope.skuInfo = one_sku;
		console.log('were here and::-->', $scope.skuInfo);
})