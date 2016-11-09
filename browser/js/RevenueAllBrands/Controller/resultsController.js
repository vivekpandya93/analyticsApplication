app.controller('resultsController', function($state, $location, $scope, homeFactory, dataService, loader){
		var formSelected = $location.search();
		$scope.initialize = function(){
				homeFactory.getBrands(formSelected).then(function(data){
					loader.hide();
					$scope.values = data; 
				});
			}		

		$scope.goToBrands = function ($event) {			
			formSelected.name = $event.target.innerText; 
			$state.go('brand', formSelected)
		}

		var name = $location.search().department

		$scope.ExportToExcel = function() {
			 alasql('SELECT * INTO XLSX("'+name+'.xlsx",{headers:true}) FROM ?',[$scope.values]);
    };
})