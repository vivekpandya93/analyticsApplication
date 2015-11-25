app.factory('loader', function(){
		return {
			status: false,
			show: function(){
				this.status = true;
			},
			hide: function(){
				this.status = false;
			}
		}
});