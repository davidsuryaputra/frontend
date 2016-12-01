var rentalkika = angular.module('rentalkika', ['ngRoute', 'ngFileUpload']);

rentalkika.run(function ($rootScope, $route, authService) {
	
	$rootScope.$on('$routeChangeSuccess', function () {
		//alert('route');
		document.title = $route.current.title;
	});	
	
	$rootScope.fbLoggedIn = authService.fb_logged_in();
	$rootScope.loggedIn = authService.app_logged_in();
	
	console.log($rootScope.fbLoggedIn);
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
});

rentalkika.controller('FlexnavController', function () {

		$('#flexnav').flexNav();
		
		
		//init plugin nav with #something here
		//#something @/pages/header.html   

});
rentalkika.controller('FilterController', function ($scope, $http) {
	var config = { headers: {'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58'}};
	
	$http.get('http://128.199.249.233:1337/parse/classes/city', config).then(function (response) {
		$scope.cities = response.data.results;	
	}, function (error) {
		console.log(error);
	});
	
	$http.get('http://128.199.249.233:1337/parse/classes/car_class',  config).then(function (response) {
		$scope.car_classes = response.data.results;
	}, function (error) {
		console.log(error);
	});
	
	
	var configVehicleInit = {
		
		params: {
			include: 'pool_id.city_id,car_id.car_class_id,partner_id.user_id',		
		},
		headers: { 'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58' }
		
	};
		
	
	$http.get('http://128.199.249.233:1337/parse/classes/vehicle', configVehicleInit).then(function (response) {
		$scope.vehicle_exists = "yes";
		$scope.vehicles = response.data.results;
		console.log($scope.vehicles);
		var arr = response.data.results;
		$scope.years = [];
		for (i = 0; i < arr.length; i++) {
			if($scope.years.indexOf(arr[i].vehicle_year) == -1){
				$scope.years.push(arr[i].vehicle_year);			
			}
		}
	}, function (error) {
		console.log(error);
	});
	
	
	$scope.filter = { tahun_mobil : '', kelas_mobil : '', lokasi_mobil : ''};
	$scope.handleSubmit = function (){
		
		/*
		var config = {
			params : {
				where : {
					vehicle_year : $scope.filter.tahun_mobil,
					car_class : $scope.filter.kelas_mobil,
					lokasi_mobil : $scope.filter.lokasi_mobil,
					vehicle_status : 'available'
				}
			},
			headers : { 'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58' }
					
		};
		*/
		
	var config = {
		
		params: {
			where: {
				vehicle_year: $scope.filter.tahun_mobil,
				pool_id: {
					$inQuery: {
						where: {
							city_id: {
								$inQuery: {
									where: {
										city_name: $scope.filter.lokasi_mobil
									},
									className: "city"								
								}
							
							}
							//pool_address: "JL. DEF"						
						},
						className: "pool"					
					}		
				},
				car_id: {
					$inQuery: {
						where: {
							car_class_id: {
								$inQuery: {
									where: {
										name: $scope.filter.kelas_mobil									
									},
									className: "car_class"								
								}
							}						
						},
						className: "car"					
					}				
				}
				
			},
			include: 'pool_id.city_id,car_id.car_class_id,partner_id.user_id'
			
		},
		
		headers: { 'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58' }	
	};
		
		console.log(config);
		
		$http.get('http://128.199.249.233:1337/parse/classes/vehicle', config).then(function (response) {
			console.log(response.data.results);
			
			if (response.data.results.length == 0) {
				//alert('data tidak ditemukan');
				//$scope.vehicles = response.data.results;
				//$scope.notfound = 'Data tidak ditemukan';	
				$scope.vehicle_exists = "no";		
			}else{
				$scope.vehicle_exists = "yes";
				$scope.vehicles = response.data.results;
				console.log(response.data.results);
			}
			
			
		}, function (error){
			console.log(error);
		});	
	
	}
	
});

//objectId: "KugCcxETFE"
//include: 'pool_id'
rentalkika.controller('ContactController', function ($scope, $http) {
	var config = {
		/*
		params: {
			where: {
				vehicle_year: "2013",
				pool_id: {
					$inQuery: {
						where: {
							city_id: {
								$inQuery: {
									where: {
										city_name: "Jakarta"
									},
									className: "city"								
								}
							
							}
							//pool_address: "JL. DEF"						
						},
						className: "pool"					
					}		
				},
				car_id: {
					$inQuery: {
						where: {
							car_class_id: {
								$inQuery: {
									where: {
										name: "Box"									
									},
									className: "car_class"								
								}
							}						
						},
						className: "car"					
					}				
				}
				
			},
			include: 'pool_id.city_id,car_id.car_class_id',
			
		},
		*/
		headers: { 'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58' }	
	};
	
	
		$http.get('http://128.199.249.233:1337/parse/classes/vehicle', config).then(function (response){
			console.log(response.data.results);
		}, function (error) {
			console.log(response);
		});

});


/*
rentalkika.factory('authService', function($scope, $http, $location){
	
	var authService = {};
	
	authService.login = function () {
			
			var configLogin = {
			params: {
				username: $scope.login.username,
				password: $scope.login.password		
			},
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/x-www-form-urlencoded'
				
			}
		}
	
		$http.get('http://128.199.249.233:1337/parse/login', configLogin).then(function (response) {
			//console.log(response.data);
			return $location.path('/dashboard');
		}, function (error){
			return $scope.error = error.data.error;
		});
		
	};	
	
	return authService;	
	
});
*/



rentalkika.controller('LoginController', function ($rootScope, $scope, $http, $route, $window, $location, sessionService, authService){
	
	// Lighbox text
	$('.popup-text').magnificPopup({
	    removalDelay: 500,
	    closeBtnInside: true,
	    callbacks: {
	        beforeOpen: function () {
	            this.st.mainClass = this.st.el.attr('data-effect');
	        }
	    },
	    midClick: true
	});
	
	
	$scope.login = { username: "", password: "" };
	
	$scope.handleLogin = function () {
		
		//authService.login($scope);
		
		
		var configLogin = {
			params: {
				username: $scope.login.username,
				password: $scope.login.password		
			},
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/x-www-form-urlencoded'
				
			}
		}
	
		$http.get('http://128.199.249.233:1337/parse/login', configLogin).then(function (response) {
			
					
			
			console.log(response.data);
			$.magnificPopup.close();
			sessionService.set('isLoggedIn', 'yes');
			sessionService.set('role', response.data.role_name);
			sessionService.set('sessionToken', response.data.sessionToken);
			sessionService.set('user_id', response.data.objectId);
				
			//$location.path('/dashboard');
			$rootScope.loggedIn = authService.app_logged_in();
				
		}, function (error){
			$scope.error = error.data.error;
		});
		
		
	}

	$scope.FBLogin = function (){
		authService.fbLogin().then(function (response) {
			
		var dataLoginFb = {
		authData: {
				facebook: {
					id: sessionService.get('fb_id'),
					access_token: sessionService.get('fb_access_token'),
					expiration_date: sessionService.get('fb_expiration_date')
				}				
			}
		}
		
		var configLoginFb = { 
		
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/json'
				}
		};
		
		$http.post('http://128.199.249.233:1337/parse/users', dataLoginFb, configLoginFb).then(function (response) {
			console.log(response.data);
			$.magnificPopup.close();
			sessionService.set('isLoggedIn', 'yes');
			sessionService.set('role', response.data.role_name);
			sessionService.set('sessionToken', response.data.sessionToken);
			sessionService.set('user_id', response.data.objectId);
				
			//$location.path('/');
			window.location.href = "/";
			
			$scope.loggedIn = authService.app_logged_in();
			console.log($scope.loggedIn);
		}, function (error) {
			console.log(error);
		});
			
		}, function (error) {
			console.log(error);
		});

		
	}
	
	$scope.logout = function () {
		
		authService.logout().then(function (response) {
			//console.log('anuu');
			$rootScope.loggedIn = false;
			$location.path('/xyz');
			console.log('logout success');
		}, function (error) {
			console.log(error);
		});
		
	}
	
	
});

rentalkika.controller('RegisterController', function ($scope, $http, $location, Upload, $timeout, authService) {
	
	$scope.customer = {
	username: '', 
	email: '',
	password: '',
	passwordConfirmation: '',
	full_name: '',
	address: '',
	phone: '',
	family_name: '',
	family_phone: '',
	family_address: '',
	};
	
	$scope.registerFB = function () {
		
		authService.fbLogin().then(function(response){
			$scope.fbLoggedIn = authService.fb_logged_in();
			console.log($scope.fbLoggedIn);
		}, function (error) {
			console.log(error);		
		})
	}

	
	$scope.handleRegister = function (file) {
		
		var data = {
			username: $scope.customer.username,
			email: $scope.customer.email,
			password: $scope.customer.passwordConfirmation,
			full_name: $scope.customer.full_name,
			address: $scope.customer.address,
			phone: $scope.customer.phone,
			status: "waiting",
			role_name: "customer"
		};
		
		$scope.file = file;
		
		var configRegister = { 
		
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/json'
				}
		};
	
		$http.post('http://128.199.249.233:1337/parse/users', data, configRegister).then(function (response) {
			console.log(response);	
			$scope.userObjectId = response.data.objectId;
			console.log($scope.userObjectId);

			//upload
			$scope.file.upload = Upload.http({
		      //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
		      //data: {username: $scope.username, file: file},
		      url: 'http://128.199.249.233:1337/parse/files/'+$scope.file.name,
		      headers: {
		       'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
		       'Content-Type': $scope.file.type
		      },
		      data: $scope.file
		    });
		
		    $scope.file.upload.then(function (response) {
		      $timeout(function () {
		        $scope.file.result = response.data;
		        console.log(response.data);
		        //berhasil
					
				  var dataProfileCustomer = {
					user_id : {
						__type: "Pointer",
						className: "_User",
						objectId: $scope.userObjectId
					},
					family_name: $scope.customer.family_name,
					family_phone: $scope.customer.family_phone,
					family_address: $scope.customer.family_address,
					ktp_user: {
						name: response.data.name,
						url: response.data.url,
						__type: "File"
					}
				};
				
				$http.post('http://128.199.249.233:1337/parse/classes/customer', dataProfileCustomer, configRegister).then(function (response) {
					console.log(response.data);
					$location.path('/');
						
				}, function (error) {
					alert(error.data.error);
				});					
							        
		        
		      });
		    }, function (response) {
		      if (response.status > 0)
		        $scope.errorMsg = response.status + ': ' + response.data;
		        console.log(response.data);
		        //gagal
		    });
			//end upload

			
			
			
		}, function (error) {
			alert(error.data.error);
			//error first req
		});
	
	}


});


rentalkika.controller('RegisterPartnerController', function ($scope, $http, $location, Upload, $timeout, authService, sessionService) {
	
	$scope.partner = {
	username: '', 
	email: '',
	password: '',
	passwordConfirmation: '',
	full_name: '',
	address: '',
	phone: '',
	owner_name: '',
	owner_phone: '',
	owner_address: '',
	};
	
	
	$scope.registerFB = function () {
		
		authService.fbLogin().then(function(response){
			$scope.fbLoggedIn = authService.fb_logged_in();
			console.log($scope.fbLoggedIn);
		}, function (error) {
			console.log(error);		
		})
	}
	
	$scope.handleRegister = function (file) {
		
		var data = {
			username: $scope.partner.username,
			email: $scope.partner.email,
			password: $scope.partner.passwordConfirmation,
			full_name: $scope.partner.full_name,
			address: $scope.partner.address,
			phone: $scope.partner.phone,
			status: "waiting",
			role_name: "partner",
			authData: {
				facebook: {
					id: sessionService.get('fb_id'),
					access_token: sessionService.get('fb_access_token'),
					expiration_date: sessionService.get('fb_expiration_date')
				}				
			}
		};
		
		$scope.file = file;
		console.log($scope.file);
		
		
		var configRegister = { 
		
			headers: {
				'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
				'Content-Type' : 'application/json'
				}
		};
	
		$http.post('http://128.199.249.233:1337/parse/users', data, configRegister).then(function (response) {
			console.log(response);	
			$scope.userObjectId = response.data.objectId;
			console.log($scope.userObjectId);
			console.log($scope.file);
			
			
			//upload
			$scope.file.upload = Upload.http({
		      //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
		      //data: {username: $scope.username, file: file},
		      url: 'http://128.199.249.233:1337/parse/files/'+$scope.file.name,
		      headers: {
		       'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
		       'Content-Type': $scope.file.type
		      },
		      data: $scope.file
		    });
		
		    $scope.file.upload.then(function (response) {
		      $timeout(function () {
		        $scope.file.result = response.data;
		        console.log(response.data);
		        //berhasil
					
				var dataProfileOwner = {
					user_id : {
						__type: "Pointer",
						className: "_User",
						objectId: $scope.userObjectId
					},
					partner_owner: $scope.partner.owner_name,
					owner_phone: $scope.partner.owner_phone,
					owner_address: $scope.partner.owner_address,
					ktp_owner: {
						name: response.data.name,
						url: response.data.url,
						__type: "File"
					}
				};
				
			$http.post('http://128.199.249.233:1337/parse/classes/partner', dataProfileOwner, configRegister).then(function (response) {
				console.log(response.data);
				$location.path('/');
					
			}, function (error) {
				alert(error.data.error);
			});				
							        
		        
		 });
		 
		    }, function (response) {
		      if (response.status > 0)
		        $scope.errorMsg = response.status + ': ' + response.data;
		        console.log(response.data);
		        //gagal
		    });
			//end upload
			
			
		}, function (error) {
			alert(error.data.error);
		});
		
	}


});

rentalkika.controller('OrderSewaMobilController', function ($filter, $location, $scope, $http, $routeParams, sessionService, masterService, orderSewaService) {
	
		$(function () {
    		$("#tanggal_sewa").datetimepicker({
				format: 'dd-mm-yyyy hh:ii',
				setStartDate : new Date()    		
    		});
    		
    		function logindialog() {
    			
    			/*
    			
		    	*/
    		};
    		
    		
    		/*
    		$("select[name='ambil_di_pool']").on('change', function () {
				if(this.value == "0"){
					$("#alamat").show();				
				}else {
					$("#alamat").hide();
				}    			
    		});
    		*/
    		
    		/*
    		$("#durasi_sewa").on('change', function () {
    			$("#durasi_sewa_order").html(this.value+" Jam");
    			var tanggal_sewa = moment($("input[id='tanggal_sewa']").val(), "DD-MM-YYYY HH:mm");
				//console.log(tanggal_sewa);    			
    			tanggal_sewa.add(this.value, 'hours');
    			$("input[name='tanggal_pengembalian']").val(tanggal_sewa.format('DD-MM-YYYY HH:mm'));
    		});
    		*/
    	});
    	
    	
    	$scope.logindialog = function () {
    		$.magnificPopup.open({
		        items: {
		            src: '#login-dialog' 
		        },
		        type: 'inline'
		   });
		};
		
		
    	
		$scope.tanggal = function () {
			var tanggal_sewa = moment($("input[id='tanggal_sewa']").val(), "DD-MM-YYYY HH:mm");
				//console.log(tanggal_sewa);    			
    			tanggal_sewa.add($scope.durasi_sewa, 'hours');
    			//$("input[name='tanggal_pengembalian']").val(tanggal_sewa.format('DD-MM-YYYY HH:mm'));
    			$scope.tanggal_pengembalian = tanggal_sewa.format('DD-MM-YYYY HH:mm');
		};
		
		/*
		$scope.pool = function () {
			alert($scope.ambil_di_pool);
		};
		*/    	
    	
		orderSewaService.vehicleDetail($routeParams.license_plate).then(function(response){
			$scope.vehicle = response;
			//console.log($scope.vehicle);
			orderSewaService.infoTarif($scope.vehicle.zone_id, $scope.vehicle.car_class_id).then(function (response) {
				$scope.infoTarif = response;
				//console.log($scope.infoTarif);
			}, function (error) {
				console.log(error);
			});
		
		}, function (error) {
			console.log(error);
		});
		
		orderSewaService.tax().then(function (response){
			$scope.taxes = response; 
			console.log(response);
		}, function (error) {
			console.log(error);
		});
		
		masterService.cities().then(function (response){
			$scope.cities = response;
		}, function (error) {
			console.log(error);
		});
		
		
		$scope.coupon = function () {
			
			orderSewaService.coupon($scope.couponCode).then(function (response) {
				//console.log(response.length);
				
				
				if (response.length == 0) {
					console.log('coupon not found');
				}else {
					var expired_date = response[0].expired_date.iso;
					var current_date = new Date().toISOString();
					if(current_date > expired_date){
						$scope.coupon_value = "Coupon is Expired"; 
					}else {
						if(response[0].coupon_is_percent == 1){
							$scope.coupon_value = response[0].coupon_value + "%";
						}else {
							$scope.coupon_value = "Rp. "+response[0].coupon_value;					
						}
					}
				}
				
				
				
				
				//console.log(response);
			}, function (error) {
				console.log(error);				
			});
			
		};
		
		$scope.total = function () {
			
			if ($scope.tujuan_sewa == undefined || $scope.durasi_sewa == undefined){
				console.log('Tujuan dan durasi wajib di isi');			
			}else{
				
			/*	
			if ($scope.couponCode == undefined) {
				var couponCode = "";
			}else {
				var couponCode = $scope.couponCode;			
			}
			*/
			//alert(couponCode);
			
			
			orderSewaService.coupon($scope.couponCode).then(function (response) {
				
				//dasar
				var tarifDasar = $filter('filter')($scope.infoTarif, { description: 'dasar'})[0];
				console.log(tarifDasar);
				var total_tarif_dasar = ($scope.durasi_sewa / 14) * tarifDasar.value;
				console.log($scope.durasi_sewa);
				console.log("dasar "+total_tarif_dasar);				
				
				//luar kota
				var tarifLuarKota = $filter('filter')($scope.infoTarif, { description: 'luar kota'})[0];
				if($scope.vehicle.city_id == $scope.tujuan_sewa){
					var is_luar_kota = 0;
					var tarif_luar_kota = 0;
				}else {
					var is_luar_kota = 1;
					var tarif_luar_kota = $scope.durasi_sewa * tarifLuarKota.value;			
				}
				console.log("luar kota"+tarif_luar_kota);
				
				var dasar_luar_kota = total_tarif_dasar + tarif_luar_kota;
				console.log("dasar luar kota "+dasar_luar_kota);				
				
				//diskon
				if (response.length == 0) {
					var diskon = 0;				
				}else {
					if (response[0].coupon_is_percent == 1) {
						var diskon = (response[0].coupon_value/100) * dasar_luar_kota;
					}else {
						var diskon = response[0].coupon_value;					
					}	
				}
				console.log("diskon "+diskon);
				
				
				var dasar_luar_kota_min_diskon = dasar_luar_kota - diskon;
				console.log("dasar_luar_kota_min_diskon "+dasar_luar_kota_min_diskon);
				var pajak = (12/100) * dasar_luar_kota_min_diskon;
				console.log("pajak " + pajak);
				$scope.total_value = dasar_luar_kota_min_diskon + pajak;
				console.log("total"+$scope.total_value);			
				
			}, function (error) {
			
			});
			
			
			
			
			}
			
			
			
			/*
			console.log(tarifDasar);		
			console.log(tarifLuarKota);
			console.log($scope.durasi_sewa);		
			console.log($scope.coupon_value);
			*/			
			
		};
		
		$scope.order = function () {
			if($scope.tujuan_sewa == undefined || $scope.tanggal_sewa == undefined || $scope.ambil_di_pool == undefined){
				alert('Lengkapi form terlebih dahulu');			
			}else{
				
				var rent_start = moment($scope.tanggal_sewa, "DD-MM-YYYY HH:mm");
				//console.log($scope.tanggal_pengembalian);
				var rent_expired = moment($scope.tanggal_pengembalian, "DD-MM-YYYY HH:mm");
				//console.log($scope.alamat);
				
				
				var ppn_obj = $filter('filter')($scope.taxes, {tax_name: "PPN"})[0];
				var pph_obj = $filter('filter')($scope.taxes, {tax_name: "PPH"})[0];
				
				orderSewaService.coupon($scope.couponCode).then(function (response) {
					
					if (response.length == 0) {
						var coupon_id = "";					
					}else {
						var coupon_id = response[0].objectId;					
					}
					
					var config = {
						headers: {
							'X-Parse-Application-Id': 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
							'Content-Type': 'application/json'					
						}				
					}
					
					var data = {
						status: 'waiting',
						vehicle_id: {
							__type: "Pointer",
							className: "vehicle",
							objectId: $scope.vehicle.vehicle_id					
						},
						partner_id: {
							__type: "Pointer",
							className: "partner",
							objectId: $scope.vehicle.partner_id					
						},
						ppn: {
							__type: "Pointer",
							className: "tax",
							objectId: ppn_obj.objectId
						},
						pph: {
							__type: "Pointer",
							className: "tax",
							objectId: pph_obj.objectId
						},
						to_city_id: {
							__type: "Pointer",
							className: "city",
							objectId: $scope.tujuan_sewa
						},
						from_city_id: {
							__type: "Pointer",
							className: "city",
							objectId: $scope.vehicle.city_id
						},
						total:  $scope.total_value,
						rent_start: {
							__type: "Date",
							iso: rent_start
						},
						rent_expired: {
							__type: "Date",
							iso: rent_expired
						
						},
						take_at_pool: parseInt($scope.ambil_di_pool),
						alamat_pengiriman: $scope.alamat,
						client_id: {
							__type: "Pointer",
							className: "_User",
							objectId: sessionService.get('user_id') 
						},
						coupon_id: {
							__type: "Pointer",
							className: "coupon",
							objectId: coupon_id
						}				
					}
					
					console.log(data);
					
					$http.post('http://128.199.249.233:1337/parse/classes/tr_sewa', data, config).then(function (response) {
						//alert('Order berhasil dikirim');
						$location.path('/order_sewa_complete/'+response.data.objectId);
					}, function (error) {
						console.log(error);
					});
					
				
					
				}, function (error) {
					console.log(error);
				});
				
				//console.log($scope.coupon_obj); 				
				
				
							
							
			}
			
		}
		
});

rentalkika.controller('OrderSewaComplete', function ($scope, $location, $routeParams){
	$scope.order_sewa_number = $routeParams.order_sewa_number;
});