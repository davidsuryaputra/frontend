(function () {
	'use strict';
	
	angular.module('BlurAdmin.pages.transaksi.sewa', [])
		.config(routeConfig);
	
	function routeConfig($stateProvider){
		$stateProvider
			.state('transaksi.sewa', {
				url: '/sewa',
				templateUrl: 'app/pages/transaksi/sewa/sewa.html',
				controller: 'SewaCtrl',
				title: 'Sewa',
				authenticate: true,
				role: ['customer', 'partner', 'admin'],
				sidebarMeta: {
					order: 0
				}
			})
			.state('transaksi.sewa.konfirmasi', {
				url: '/konfirmasi/:nomor_order_sewa',
				templateUrl: 'app/pages/transaksi/sewa/konfirmasi.html',
				//template: 'halo ini konfirmasi',
				/*				
				controller: function ($scope) {
					$scope.abc = "aaabbbcc";				
				},
				*/
				controller: 'KonfirmasiCtrl',
				title: 'Konfirmasi Sewa',
				role: ['customer', 'partner', 'admin'],
				sidebarMeta: {
					order: 0				
				}			
			});
		
	}	
	
})();