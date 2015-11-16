app.controller('userController', function($state, $scope, homeFactory){
	$scope.category = localStorage.getItem('category')
	$scope.gender = localStorage.getItem('gender')
	var formSelected = {
		from: "2015-10-27",
		to: "2015-10-28", 
		category: $scope.category,
		gender: $scope.gender	
	}
	$scope.customized = function(){
		console.log(formSelected)
				homeFactory.getBrands(formSelected).then(function(data){
					console.log(data)
					$scope.values = data; 
				});
			}		
$scope.goToBrand = function ($event) {
			formSelected.name = $event.target.innerText; 
			console.log("formSelected.name:", $event.target.innerText)
			$state.go('brand', formSelected)
		}
})