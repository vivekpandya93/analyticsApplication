app.config(function($stateProvider) {
    $stateProvider
    	.state('home', {
    		url: '/',
    		template: '<field-boxes></field-boxes>',
    		controller: 'formController'
    	})
    	.state('results', {
            url: '/results?from&to&category&gender',
            templateUrl: 'js/RevenueAllBrands/templates/results.html',
        	controller: 'resultsController'
        	})
    	.state('brand', {
    		url: '/results/?name?from&to&category&gender',
    		templateUrl: 'js/styleInfo/brandStates.html',
    		controller: 'brandController',
            resolve:  {
                one_brand: function(homeFactory, $stateParams, $location) {
                    var formInfo = $location.search();
                    console.log("STATEPARAMS: ", $stateParams)
                     console.log("formInfo: ", formInfo)

                    return homeFactory.getOneBrand($stateParams.name)
                }
            }
    	})
        .state('stock_left', {
            url: '/results/:name/:sku',
            templateUrl: 'js/SKUInfo/sku.html',
            controller: 'skuController',
            resolve: {
                one_sku: function(homeFactory, $stateParams) {
                    console.log("stateParams:", $stateParams)
                    return homeFactory.getOneSku($stateParams.name, $stateParams.sku)
                }
            }
        })
        .state('user_profile', {
         url: '/profile',
         templateUrl: 'js/user_profile/profile.html', 
         controller: 'userController' 
        })
   })




