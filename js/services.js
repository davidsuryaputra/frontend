var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';

rentalkika.factory('sessionService', function () {
	
	var sessionService = {};
	
	sessionService.set = function (key, value) {
		return localStorage.setItem(key, value);
	};
	
	sessionService.get = function (key) {
		return localStorage.getItem(key);
	};
		
	sessionService.destroy = function (key) {
		return localStorage.removeItem(key);
	};	
	
	return sessionService;
	
});

rentalkika.factory('authService', function (sessionService, $rootScope, $q, $http) {
	
	var authService = {};
	
	authService.fbLogin = function () {
			var defer = $q.defer();
			var FB = window.FB;
			
			FB.login(function(response) {
		 	console.log(response);
		 	
		 	/*
		 	authData: {
				facebook: {
					id: response.authResponse.userID,
					access_token: response.authResponse.accessToken,
					expiration_date: new Date(new Date().getTime() + response.authResponse.expiresIn * 1000).toISOString()
				}		 	
		 	}
		 	*/
		 	//;
		 	//response.authResponse.userID
		 	//response.authResponse.expiresIn;
		 	
	    if (response.authResponse) {
	    	sessionService.set('fb_id', response.authResponse.userID);
		 	sessionService.set('fb_access_token', response.authResponse.accessToken);
		 	sessionService.set('fb_expiration_date', new Date(new Date().getTime() + response.authResponse.expiresIn * 1000).toISOString());
	     //console.log('Welcome!  Fetching your information.... ');
	     FB.api('/me', function(response) {
	       defer.resolve('Good to see you, ' + response.name + '.');
	     	 console.log(response);
	     	 //$scope.fbName = response.name;
			 //var expDate = new Date(new Date().getTime() + $localStorage.expiresIn * 1000).toISOString();
				
	     });
	     //$location.path('/register');
	     //$rootScope.fbLoggedIn = true;
	     
	    } else {
	     defer.reject('User cancelled login or did not fully authorize.');
	     //console.log(response);
	    }
		});
		return defer.promise;
	
	};
	
	authService.fb_logged_in = function () {
		if(sessionService.get('fb_access_token') != null){
			return true;
		}else {
			return false;		
		}
	};
	
	authService.app_logged_in = function () {
		if(sessionService.get('sessionToken') != null){
			return true;
		}else {
			return false;		
		}
	};
	
	authService.logout = function () {
		
		//var defer = $q.defer();
		
		var configLogout = { 
		
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'X-Parse-Session-Token' : sessionService.get('sessionToken')
				}
		};
		
		var data = {};
	
		return $http.post('http://128.199.249.233:1337/parse/logout', data, configLogout).then(function (response) {
			sessionService.destroy('isLoggedIn');	
			sessionService.destroy('role');	
			sessionService.destroy('sessionToken');
			sessionService.destroy('user_id');
			sessionService.destroy('fb_id');
			sessionService.destroy('fb_access_token');
			sessionService.destroy('fb_expiration_date');
			$rootScope.loggedIn = false;
			//defer.resolve("Logout success");	
			return response;	
		
		}, function (error) {
			//defer.reject("Logout error");
			return error;
		});
		
		//return defer.promise;
		
		//$window.location.href = "/";
	
	};
	
	return authService;

});

//var xyz = "asoe";


rentalkika.factory('masterService', function ($http, $q) {
	
	var masterService = {};
	//var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';
	
	masterService.vehicleCities = function () {
		
	var defer = $q.defer();
			
	var config = { 
		headers: { 
			'X-Parse-Application-Id' : parseAppId
		},
		params: {
			where: {
				vehicle_status: 'available'			
			},
			include: 'pool_id.city_id'	
		}
	};
	
	$http.get('http://128.199.249.233:1337/parse/classes/vehicle', config).then(function (response) {
		var arr = response.data.results;
		var available_city = [];
		for (i=0; i<arr.length; i++) {
			if (available_city.indexOf(arr[i].pool_id.city_id.city_name) == -1) {
				available_city.push(arr[i].pool_id.city_id.city_name);			
			}
		}
		defer.resolve(available_city);
		//return available_city;
		//console.log(response.data.results[0].pool_id.city_id.city_name);	
	}, function (error) {
		defer.reject(error);
	});
		return defer.promise;
	};	
	
	masterService.cities = function () {
		
		//console.log(xyz);
		//var defer = $q.defer();
		
		var config = { 
			headers: { 
				'X-Parse-Application-Id' : parseAppId
			}
		}
		
		return $http.get('http://128.199.249.233:1337/parse/classes/city', config).then(function (response) {
			//defer.resolve(response.data.results);
			return response.data.results;
		}, function (error) {
			//defer.reject(error);
			return error;
		});
		
		//return defer.promise;
		
	};
	
	masterService.bank_company = function () {
			
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
	
	return masterService;
	
});

rentalkika.factory('orderSewaService', function ($http, $q){
	
	var orderSewaService = {};	
	var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';
	
	orderSewaService.vehicleDetail = function (license_plate) {
		
		//var defer = $q.defer();
		
		var config = {
			headers: {
				'X-Parse-Application-Id': parseAppId
			},
			params: {
				where: {
					vehicle_license_plate: license_plate,
					vehicle_status: 'available'
				},
				limit: 1,
				include: 'car_id.car_class_id,pool_id.city_id,partner_id.user_id'	
			}
					
		}
		
		return $http.get('http://128.199.249.233:1337/parse/classes/vehicle', config).then(function (response) {
			var detail = {
				vehicle_id: response.data.results[0].objectId,
				license_plate: response.data.results[0].vehicle_license_plate,
				photo: response.data.results[0].vehicle_photo,
				partner_name: response.data.results[0].partner_id.user_id.full_name,
				partner_id: response.data.results[0].partner_id.objectId,
				year: response.data.results[0].vehicle_year,
				class: response.data.results[0].car_id.car_class_id.name,
				pool_address: response.data.results[0].pool_id.pool_address,
				city: response.data.results[0].pool_id.city_id.city_name,
				zone_id: response.data.results[0].zone_id.objectId,
				car_class_id: response.data.results[0].car_id.car_class_id.objectId,
				city_id: response.data.results[0].pool_id.city_id.objectId	
						
			};
			
			return detail;
			
			//defer.resolve(detail);
		}, function (error) {
			//defer.reject(error);
			return error;
		});				
		
		//return defer.promise;		
		
	};
	
	orderSewaService.infoTarif = function (zone_id, car_class_id) {
		
		var config = {
			headers: {
				'X-Parse-Application-Id': parseAppId
			},
			params: {
				where: {
					zone_id: {
						__type : "Pointer",
						className: "zone",
						objectId: zone_id
					},
					car_class_id: {
						__type : "Pointer",
						className: "car_class",
						objectId: car_class_id
					}
				}
			}
		}
		
		return $http.get('http://128.199.249.233:1337/parse/classes/harga_sewa', config).then(function (response) {
			return response.data.results;
			//defer.resolve(detail);
		}, function (error) {
			//defer.reject(error);
			return error;
		});		
		
	};
	
	orderSewaService.tax = function () {
		
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId			
			}
		};
		
		return $http.get('http://128.199.249.233:1337/parse/classes/tax', config).then(function (response) {
			return response.data.results;
		}, function (error){
			return error;
		});
	
	};
	
	orderSewaService.coupon = function (couponCode) {
		
		//alert(couponCode);
		if (couponCode == undefined) {
			couponCode = "x";		
		}
		
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId			
			},
			params: {
				where: {
					coupon_code: couponCode
				}
			}
		};
		
		return $http.get('http://128.199.249.233:1337/parse/classes/coupon', config).then(function (response) {
			return response.data.results;		
		}, function (error){
			return error;
		});		
		
	}; 
	
	orderSewaService.kupon = function (couponCode){
		
		if(couponCode == undefined) {
			couponCode = "x";
		}	
		
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId			
			},
			params: {
				where: {
					coupon_code: couponCode
				}
			}
		};
		
		$http.get('http://128.199.249.233:1337/parse/classes/coupon', config).then(function (response) {
			return response.data.results;		
		}, function (error){
			return error;
		});	
			
	};	
	
	return orderSewaService;	
	
});

