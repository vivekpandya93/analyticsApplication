app.controller('skuController', function($state, $scope, homeFactory, one_sku){
	console.log("one_sku:", one_sku)
		$scope.skuInfo = one_sku;
		$scope.parentSku = $scope.skuInfo[0].Individual_SKUs
})