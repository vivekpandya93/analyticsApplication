app.controller('brandController', function($state, $scope, homeFactory, one_brand, loader){

		$scope.brandInfo = one_brand;
$scope.ExportToExcel = function() {
			 alasql('SELECT * INTO XLSX("john.xlsx",{headers:true}) FROM ?',[$scope.brandInfo]);
    };

    loader.hide();

})