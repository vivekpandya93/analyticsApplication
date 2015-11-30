app.factory('homeFactory', function($http){
	 var path = '/api/brands/';
	 function extractData (serverResponse) {
	  	return serverResponse.data.result;
	  }

	return {
		getBrands: function(formData) {
        return $http.get(path, {params:formData}).then(extractData);
		},
		getOneBrand: function(name, stateParams) {
			console.log('inside getOneBrand: ', path + name);
			return $http.get(path + name, {params:stateParams}).then(extractData);
		},
		getOneSku: function(name, sku) {
			var regexed = path + name.split(' ').join('_') + '/' + sku;
			console.log(regexed);
			return $http.get(regexed).then(extractData);
		},
		getBuyerInfo: function(){
			return $http.get('/api').then(function(serverResponse){
				console.log('name: ', serverResponse.data.email.split('.')[0]);
				return serverResponse.data.email.split('.')[0];
			})
		},
		sendEmailInfo: function(email){
			return $http.post('/api/email', email).then(function(response) {
				return response.data;
			})
		},
		ExportToExcel: function() {
			return $http.get(path+'excel');
		}
	}
})
