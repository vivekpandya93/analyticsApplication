app.controller('navbarController', function($state, $scope, homeFactory, dataService, $rootScope, $location){
	 	$rootScope.parameters = {};
	 	$scope.newParams = {}
	 	$scope.originalParams = $location.search()

	  homeFactory.getBuyerInfo().then(function(name){
	  		$scope.name = name;
	  		console.log("original Params:", $scope.originalParams)
	  })

	  if($location.search().category){
	  	$scope.CategorySelected = true;
	  }

	 	$scope.ExecuteThis = function() {
	 			$state.go('results', $scope.newParams)
	 		
	 	}
	 	$scope.isClicked = function() {
	 		if($location.search().from) return true; 
	 		else return false; 
	 	}
	  $scope.params = $rootScope.parameters;
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
		$scope.toggleView = function() {
			console.log("inside here and", $scope.newParams.department)
		if($scope.newParams.department === "Bags" && $location.search().category) {
				$scope.isBags = true
				$scope.isAccesory = false;
				$scope.isShoes = false;
				$scope.isClothing = false;
			}
		else if($scope.newParams.department === "Clothing" && $location.search().category) {
				$scope.isBags = false
				$scope.isAccesory = false;
				$scope.isShoes = false;
				$scope.isClothing = true;
			}
		else if($scope.newParams.department === "Accessories" && $location.search().category) {
				$scope.isBags = false
				$scope.isAccesory = true;
				$scope.isShoes = false;
				$scope.isClothing = false;
			}
		else if($scope.newParams.department === "Shoes" && $location.search().category) {
				$scope.isBags = false
				$scope.isAccesory = false;
				$scope.isShoes = true;
				$scope.isClothing = false;
			}

		}
})