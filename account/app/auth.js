(function () {
	'use strict';
	
	var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';
	
	angular.module('BlurAdminAuth', ['ui.router'])
	.run(function () {
		
		
		//init fb login
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '218120761958155',
	      xfbml      : true,
	      version    : 'v2.8'
	    });
	    FB.AppEvents.logPageView();
	  };
	
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));	
		//end fb login
		
				
	})
	.controller('BlurAdminAuth', function ($rootScope, $scope, $state, authFactory, sessionFactory, $http) {
		
		$rootScope.$state = $state;
		
		authFactory.isAuthenticated().then(function (response) {
				//window.location.href = "http://" + window.location.host + "/account/";
				window.location.href = "http://" + window.location.host + "/frontend/account/";
				//alert('logged in');
		}, function (error) {
				//console.log('please log in');
				
		});
		
		$scope.login = function () {
			
			//alert($scope.account.username);
					
										
					authFactory.login($scope.account.username, $scope.account.password).then(function (response) {
						
					sessionFactory.set('isLoggedIn', 'yes');
					sessionFactory.set('role', response.data.role_name);
					sessionFactory.set('sessionToken', response.data.sessionToken);
					sessionFactory.set('user_id', response.data.objectId);
					//window.location.href = "http://" + window.location.host + "/account/";
					window.location.href = "http://" + window.location.host + "/frontend/account/";
					
					}, function (error) {
						
						$scope.error = error.data.error;						
						
					});
					
					//alert('login');
		}
				
			
		$scope.fbLogin = function () {
					
				authFactory.fbLogin().then(function (response) {
					
					var dataLoginFb = {
						authData: {
								facebook: {
									id: sessionFactory.get('fb_id'),
									access_token: sessionFactory.get('fb_access_token'),
									expiration_date: sessionFactory.get('fb_expiration_date')
								}				
							}
						}
						
						var configLoginFb = { 
						
							headers: {
								'X-Parse-Application-Id' : parseAppId,
								'Content-Type' : 'application/json'
								}
						};
						
						$http.post('http://128.199.249.233:1337/parse/users', dataLoginFb, configLoginFb).then(function (response) {
							//console.log(response.data);
							//$.magnificPopup.close();
							sessionFactory.set('isLoggedIn', 'yes');
							sessionFactory.set('role', response.data.role_name);
							sessionFactory.set('sessionToken', response.data.sessionToken);
							sessionFactory.set('user_id', response.data.objectId);
								
							//$location.path('/');
							//window.location.href = "http://" + window.location.host + "/account";
							window.location.href = "http://" + window.location.host + "/frontend/account";
							//return response.data;
							//$scope.loggedIn = authService.app_logged_in();
							//console.log($scope.loggedIn);
						}, function (error) {
							console.log(error);
							$scope.error = error;
							//return error;
						});
					
				}, function (error) {
					$scope.error = error;
				});					
									
		}
		
		
		/*
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			
			
		});
		*/		
		
	})
	.factory('authFactory', function (sessionFactory, $http, $q) {
	
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
	
	//$scope.account = {};	
	
	authFactory.login = function (username, password) {
		
		var configLogin = {
			params: {
				username: username,
				password: password		
			},
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/x-www-form-urlencoded'
				
			}
		}
	
		return $http.get('http://128.199.249.233:1337/parse/login', configLogin)
		
			
	};
	
	
	authFactory.fbLogin = function () {
		var FB = window.FB;
		
		var defer = $q.defer();
		
		FB.login(function (response) {
			
			if (response.authResponse) {
				    	sessionFactory.set('fb_id', response.authResponse.userID);
					 	sessionFactory.set('fb_access_token', response.authResponse.accessToken);
					 	sessionFactory.set('fb_expiration_date', new Date(new Date().getTime() + response.authResponse.expiresIn * 1000).toISOString());
				     //console.log('Welcome!  Fetching your information.... ');
				     FB.api('/me', function(response) {
				       //defer.resolve('Good to see you, ' + response.name + '.');
				     	 console.log(response);
				     	defer.resolve(response.name);
						 //var expDate = new Date(new Date().getTime() + $localStorage.expiresIn * 1000).toISOString();
							
				     });
				     //$location.path('/register');
				     //$rootScope.fbLoggedIn = true;
				     
				     
				     
				    } else {
				     	defer.reject("User cancelled login or did not fully authorize.");
				     //console.log(response);
				    }
			
		});
		return defer.promise;
		
		
	};	
	
	
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
	

})();