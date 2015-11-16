app.controller('formController', function($state, $scope, homeFactory, dataService){
		$scope.goTo = function(){
			console.log(localStorage.getItem('gender'))
			console.log(localStorage.getItem('category'))

			$state.go('results', $scope.formSelected);
			}	
})