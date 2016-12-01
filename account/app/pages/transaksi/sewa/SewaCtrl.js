(function (){
	'use strict';
	//['ngFileUpload']
	angular.module('BlurAdmin.pages.transaksi.sewa')
		//.factory('masterFactory', masterFactory)
		.controller('SewaCtrl', SewaCtrl)
		.controller('ModalCtrl', ModalCtrl)
		.controller('KonfirmasiCtrl', KonfirmasiCtrl);
		
	
	var parseAppId = "gMKfl1wDyk3m6I5x0IrIjJyI87sumz58";	
		
	function ModalCtrl($scope, $uibModalInstance, item) {
		$scope.tr_sewa = item;
	}
	
	//Upload
	function KonfirmasiCtrl($scope, Upload, $http, $stateParams, masterFactory, $state){
		$scope.nomor_order = $stateParams.nomor_order_sewa;
		$scope.bank = {};
		
		masterFactory.bank_company().then(function (response) {
			console.log(response);
			$scope.banks = response;
		}, function (error) {
			console.log(error);		
		});
		
		/*
		masterFactory.bank_company().then(function (response) {
			console.log(response);
			$scope.banks = response;
		}, function (error) {
			console.log(error);		
		});
		*/		
		
		$scope.kirim = function (file) {
			$scope.file = file;
			//alert($scope.nomor_order);
						
			$scope.file.upload = Upload.http({
				url: 'http://128.199.249.233:1337/parse/files/'+$scope.file.name,
				headers: {
					'X-Parse-Application-Id' : 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58',
					'Content-Type': $scope.file.type
				},
				data: $scope.file			
			});
			
			$scope.file.upload.then(function (response) {
				
				var data = {
					bank_id: {
						__type: "Pointer",
						className: "bank",
						objectId: $scope.bank.bank_tujuan					
					},
					tr_sewa_id: {
						__type: "Pointer",
						className: "tr_sewa",
						objectId: $scope.nomor_order					
					},
					payment_proof: {
						name: response.data.name,
						url: response.data.url,
						__type: "File"
					},
					status: 'waiting'
				};

				var config = {
					headers: {
						'X-Parse-Application-Id' : parseAppId,
						'Content-Type' : 'application/json'
					}
				};				
				
				$http.post('http://128.199.249.233:1337/parse/classes/tr_sewa_confirmation', data, config).then(function (response) {
					//$location.pathname
					var data = {
						status: 'payment in review'
					};
					
					var config = {
						headers: {
							'X-Parse-Application-Id' : parseAppId,
							'Content-Type' : 'application/json'
						}					
					}					
					
					$http.put('http://128.199.249.233:1337/parse/classes/tr_sewa/'+$scope.nomor_order, data, config).then(function (response) {
						//$location.path('/transaction/sewa');
						$state.go('transaksi.sewa', {}, {reload: true});
					}, function (error) {
						console.log(error);					
					})
				}, function (error) {
					console.log(error);
				});
				console.log(response);
			}, function (error) {
				console.log(error);
			});
			
			
						
			//console.log(file);
			//alert('do something');		
		}
		//alert($scope.abc);	
	}
		
	function SewaCtrl($scope, $http, $uibModal, $location){
		
		//alert('hello sewa');
		
		$scope.location = $location;
		
		$scope.open = function (nomor_order){
			
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId			
			},
			params: {
				include: 'vehicle_id,partner_id.user_id,coupon_id,to_city_id,from_city_id,client_id'			
			}
		}
		
		$http.get('http://128.199.249.233:1337/parse/classes/tr_sewa/'+nomor_order, config).then(function (response) {
			
		if(typeof(response.data.coupon_id.coupon_code) == 'undefined'){
			var kode_kupon = "Tanpa kupon";
		}else{
			var kode_kupon = response.data.coupon_id.coupon_code;
		}
		
		if(typeof(response.data.rent_return) == 'undefined'){
			var tanggal_pengembalian = "Belum dikembalikan";				
		}else {
			var date_return =  moment(response.data.rent_return.iso).format("DD-MM-YYYY HH:mm");
			var tanggal_pengembalian = date_return;
		}
		
		if(typeof(response.data.alamat_pengiriman) == 'undefined'){
			var alamat_pengiriman = "Di ambil dipool";				
		}else {
			var alamat_pengiriman = response.data.alamat_pengiriman;
		}
				
		var item = {
			nomor_order: response.data.objectId,
			nama_rental: response.data.partner_id.user_id.full_name,
			nama_pelanggan: response.data.client_id.full_name,
			kode_kupon: kode_kupon,
			asal_kota: response.data.from_city_id.city_name,
			tujuan_kota: response.data.to_city_id.city_name,
			mobil_rental: response.data.vehicle_id.vehicle_license_plate,
			tanggal_sewa: moment(response.data.rent_start.iso).format("DD-MM-YYYY HH:mm"),
			tanggal_berakhir: moment(response.data.rent_expired.iso).format("DD-MM-YYYY HH:mm"),
			tanggal_pengembalian: tanggal_pengembalian,
			alamat_pengiriman: alamat_pengiriman,
			ambil_di_pool: response.data.take_at_pool,
			total: response.data.total,
			status: response.data.status
		};
			
		//console.log(response);
		
		$uibModal.open({
			templateUrl: "app/pages/transaksi/sewa/modal.html",
			size: 'md',
			controller: "ModalCtrl",
			resolve: {
				item: function () {
					return item;
				}
				
			}
		});
		
			
		}, function (error) {
			console.log(error);
		});
		
			
		}
    
		var config = {
			headers: {
				'X-Parse-Application-Id' : parseAppId
			},
			params: {
				include: 'vehicle_id,partner_id.user_id,coupon_id,to_city_id,from_city_id,client_id'
			}
		}
		
		$scope.sewaResults = [];
		
		$http.get('http://128.199.249.233:1337/parse/classes/tr_sewa', config).then(function (response){
			console.log(response.data.results);
			
			//console.log(response.data.results[i].coupon_id);
			
			var i;
			for(i = 0; i < response.data.results.length; i++){
				//console.log(i+" nn");				
				//alert(i);	
				if(typeof response.data.results[i].coupon_id === 'undefined'){
					var kode_kupon = "Tanpa kupon";
				}else{
					var kode_kupon = response.data.results[i].coupon_id.coupon_code;
				}
				
				if(typeof response.data.results[i].rent_return === 'undefined'){
					var tanggal_pengembalian = "Belum dikembalikan";				
				}else {
					var date_return =  moment(response.data.results[i].rent_return.iso).format("DD-MM-YYYY HH:mm");
					var tanggal_pengembalian = date_return;
				}
				
				if(typeof response.data.results[i].alamat_pengiriman === 'undefined'){
					var alamat_pengiriman = "Di ambil dipool";				
				}else {
					var alamat_pengiriman = response.data.results[i].alamat_pengiriman;
				}
						
				var obj = {
					nomor_order: response.data.results[i].objectId,
					nama_rental: response.data.results[i].partner_id.user_id.full_name,
					nama_pelanggan: response.data.results[i].client_id.full_name,
					kode_kupon: kode_kupon,
					asal_kota: response.data.results[i].from_city_id.city_name,
					tujuan_kota: response.data.results[i].to_city_id.city_name,
					mobil_rental: response.data.results[i].vehicle_id.vehicle_license_plate,
					tanggal_sewa: moment(response.data.results[i].rent_start.iso).format("DD-MM-YYYY HH:mm"),
					tanggal_berakhir: moment(response.data.results[i].rent_expired.iso).format("DD-MM-YYYY HH:mm"),
					tanggal_pengembalian: tanggal_pengembalian,
					alamat_pengiriman: alamat_pengiriman,
					ambil_di_pool: response.data.results[i].take_at_pool,
					total: response.data.results[i].total,
					status: response.data.results[i].status
				};	
				$scope.sewaResults.push(obj);	
				
			}
			
			console.log($scope.sewaResults);
			
		}, function (error) {
			console.log(error);
		});
		
				
				
	}
	
	

	function masterFactory($http) {
	
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
	
	}
	
})();