app.factory('dataService', function() {
		var dataObject = {};
		return {
			set: function(value) {
					dataObject = value;
			},
			get: function() {
				return dataObject;
			}
		}
});