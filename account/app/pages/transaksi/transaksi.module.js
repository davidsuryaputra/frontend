(function () {
	'use strict';
	angular.module('BlurAdmin.pages.transaksi', [
		'BlurAdmin.pages.transaksi.sewa',
		'ngFileUpload'
	])
		.config(routeConfig)
		
		function routeConfig($stateProvider){
			$stateProvider
			.state('transaksi', {
				url: '/transaksi',
				template: '<ui-view></ui-view>',
				abstract: true,
				//templateUrl: 'app/pages/transaksi/transaksi.html',
				//controller: 'TransaksiCtrl',
				title: 'Transaksi',
				sidebarMeta: {
					icon: 'ion-grid',
					order: 100				
				}
			});
		}

})();