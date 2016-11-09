app.controller('brandController', function($state, $scope, homeFactory, one_brand, loader, $location){

		$scope.brandInfo = one_brand;
		var name = $location.search().name
		$scope.ExportToExcel = function() {
			 alasql('SELECT * INTO XLSX("'+name+'.xlsx",{headers:true}) FROM ?',[$scope.brandInfo]);
    };

    loader.hide();

})