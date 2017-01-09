(function () {
	'use strict';
	
var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';

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

angular.module('BlurAdmin.pages')
.factory('authFactory', function (sessionFactory, $http) {
	
	var authFactory = {};
	
	authFactory.isAuthenticated = function () {
			
		var config = {
			headers: {
				'X-Parse-Application-Id': parseAppId,
				'X-Parse-Session-Token': sessionFactory.get('sessionToken')			
			}
		}
		
		return $http.get('http://128.199.249.233:1337/parse/users/me', config)
		
	};
	
	authFactory.logout = function () {
		
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId,
				'X-Parse-Session-Token': sessionFactory.get('sessionToken'),
				'Content-Type': 'application/json'
			}
		}
		
		var data = {
		
		}
		
		return $http.post('http://128.199.249.233:1337/parse/logout', data, config)
		
	};
	
	authFactory.isPartner = function () {
		if(sessionFactory.get('role') == "partner"){
			return true;
		};
	};
	
	authFactory.isCustomer = function () {
		if(sessionFactory.get('role') == "customer"){
			return true;		
		};	
	};
	
	authFactory.isAdmin = function () {
		if(sessionFactory.get('role') == "admin"){
			return true;
		};	
	};
	
	authFactory.currentRole = function () {
		return sessionFactory.get("role");	
	}
	
	return authFactory;	
	
})
.factory('sessionFactory', function () {
	
	var sessionFactory = {};
	
	sessionFactory.set = function (key, value){
		localStorage.setItem(key, value);	
	};
	
	sessionFactory.get = function (key){
		return localStorage.getItem(key);
	};
	
	sessionFactory.destroy = function (key){
		localStorage.removeItem(key);
	};
	
	return sessionFactory; 
	
});

angular.module('BlurAdmin.pages.components')
.provider("role", function () {
      	
      	this.role = localStorage.getItem('role');
      	
      	this.$get = function () {
      		var role = this.role;
      		return {
	      		currentRole: function () {
	      			return role;
					}
      		
      		}
      	}
      	
      	this.currentRole = function (){
				return this.role;      	
      	}
      
      });


})();