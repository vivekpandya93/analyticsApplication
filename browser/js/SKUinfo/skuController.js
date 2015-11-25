app.controller('skuController', function($state, $scope, homeFactory, one_sku, loader){

		$scope.skuInfo = one_sku;
		$scope.parentSku = $scope.skuInfo[0].Individual_SKUs
			$scope.ExportToExcel = function() {
			 alasql('SELECT * INTO XLSX("sku.xlsx",{headers:true}) FROM ?',[$scope.skuInfo]);
    };
		loader.hide();

})