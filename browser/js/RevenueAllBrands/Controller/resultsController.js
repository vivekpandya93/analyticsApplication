app.controller('resultsController', function($state, $location, $scope, homeFactory, dataService, loader){
		var formSelected = $location.search();
		$scope.initialize = function(){
				homeFactory.getBrands(formSelected).then(function(data){
					loader.hide();
					$scope.values = data; 
				});
				console.log("data before results from DATA SERVICE:", $scope.values)
			}		

		$scope.goToBrands = function ($event) {			
			formSelected.name = $event.target.innerText; 
			console.log("formSelected.name:", $event.target.innerText)
			$state.go('brand', formSelected)
		}

		$scope.ExportToExcel = function() {
			 alasql('SELECT * INTO XLSX("brandInfo.xlsx",{headers:true}) FROM ?',[$scope.values]);
    };
})