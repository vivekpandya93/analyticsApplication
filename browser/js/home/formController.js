app.controller('formController', function($state, $scope, homeFactory, dataService, $rootScope, loader){
		$scope.goTo = function(){
			// angular.extend($rootScope.parameters, $scope.formSelected);
			console.log(localStorage.getItem('gender'))
			console.log(localStorage.getItem('category'))

			$state.go('results', $scope.formSelected);
			}	


			$scope.currentDate = function () {
				var currentDate = new Date()
				 $scope.formSelected.from  = $filter('date')(currentDate, "yyyy-MM-dd"); 
				 $scope.formSelected.to = $filter('date')(currentDate.setDate(currentDate.getDate() - 1), "yyyy-MM-dd")
			}

			$scope.lastWeek = function () {
				var currentDate = new Date()
				 $scope.formSelected.from  = $filter('date')(currentDate, "yyyy-MM-dd"); 
				 $scope.formSelected.to = $filter('date')(currentDate.setDate(currentDate.getDate() - 7), "yyyy-MM-dd")
			}

			$scope.lastMonth = function () {
				var currentDate = new Date()
				 $scope.formSelected.from  = $filter('date')(currentDate, "yyyy-MM-dd"); 
				 $scope.formSelected.to = $filter('date')(currentDate.setDate(currentDate.getDate() - 30), "yyyy-MM-dd")
			}
			
	  homeFactory.getBuyerInfo().then(function(name){
	  		$scope.name = name;
	  })

		$scope.accessories = [
			"Belts",
		  "Dress Shop",	
		 	"Electronic Accessories",
			"Headwear",
			"Jewellery",
			"Sports Accessories",
			"Sunglasses",
			"Watches" ]

		$scope.shoes = [
			"Boots",
			"Comfort Shoes",
			"Flat Shoes",
			"Flip Flops",
			"Lace ups",
			"Pumps",
			"Sandals",
			"Slip ons",
			"Sneakers",
			"Sports Shoes"
		]

		$scope.clothing = [
		"Arabian Clothing",
		"Bottoms",
		"Cardigans & Sweaters",
		"Dresses",
		"Hoodies & Sweatshirts",
		"Jackets & Coats",
		"Jeans",
		"Jumpsuits & Playsuits",
		"Lingerie & Nightwear",
		"Maternity Clothing",
		"Nightwear",
		"Pants & Chinos",
		"Pants & Leggings",
		"Plus Size Clothing",
		"Polo Shirts",
		"Sets",
		"Shirts",
		"Shorts",
		"Skirts",
		"Swimwear",
		"Swimwear & Beachwear",
		"T-shirts & Vests",
		"Tops",
		"Underwear & Socks"
		]

		$scope.bags = [
		"Bags",
		"Handbags",
		"Small Leather Goods",
		"Sports Bags"
		] 

		loader.hide();
		
		$scope.toggleView = function() {
			console.log("inside here and", $scope.formSelected.department)
		if($scope.formSelected.department === "Bags") {
				$scope.isBags = true
				$scope.isAccesory = false;
				$scope.isShoes = false;
				$scope.isClothing = false;
			}
		else if($scope.formSelected.department === "Clothing") {
				$scope.isBags = false
				$scope.isAccesory = false;
				$scope.isShoes = false;
				$scope.isClothing = true;
			}
		else if($scope.formSelected.department === "Accessories") {
				$scope.isBags = false
				$scope.isAccesory = true;
				$scope.isShoes = false;
				$scope.isClothing = false;
			}
		else if($scope.formSelected.department === "Shoes") {
				$scope.isBags = false
				$scope.isAccesory = false;
				$scope.isShoes = true;
				$scope.isClothing = false;
			}

		}
})