app.config(function($stateProvider) {
    $stateProvider
    	.state('home', {
    		url: '/',
    		template: '<field-boxes></field-boxes>',
    		controller: 'formController'
    	})
    	.state('results', {
            url: '/results?from&to&department&category&gender',
            templateUrl: 'js/RevenueAllBrands/templates/results.html',
        	controller: 'resultsController'
        	})
    	.state('brand', {
    		url: '/results/?name&department&from&to&category&gender',
    		templateUrl: 'js/styleInfo/brandStates.html',
    		controller: 'brandController',
            resolve:  {
                one_brand: function(homeFactory, $stateParams, $location, $rootScope) {
                    var formInfo = $location.search();
                    console.log("STATEPARAMS: ", $stateParams)
                     console.log("formInfo: ", formInfo)

                    return homeFactory.getOneBrand($stateParams.name, $stateParams)
                }
            }
    	})
        .state('stock_left', {
            url: '/results/:name/:sku',
            templateUrl: 'js/SKUInfo/sku.html',
            controller: 'skuController',
            resolve: {
                one_sku: function(homeFactory, $stateParams, $location, $rootScope) {
                    console.log("stateParams:", $stateParams)
                    var name = $location.search().name
                    console.log("name:", name)
                    return homeFactory.getOneSku(name, $stateParams.sku)
                }
            }
        })
   })




