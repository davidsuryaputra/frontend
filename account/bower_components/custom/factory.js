(function () {
	'use strict';

angular.module('BlurAdmin.pages.transaksi.sewa').factory('masterFactory', function ($http) {
	
	var masterFactory = {};

	var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';	
	
	masterFactory.bank_company = function () {
		
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId
			}		
		}
		
		return $http.get('http://128.199.249.233:1337/parse/classes/bank', config).then(function (response) {
			return response.data.results;
		}, function (error) {
			return error;
		});
	
	}	
	
	return masterFactory;	
	
});

})();