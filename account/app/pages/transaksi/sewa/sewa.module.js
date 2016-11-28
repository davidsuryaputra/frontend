(function () {
	'use strict';
	
	angular.module('BlurAdmin.pages.transaksi.sewa', [])
		.config(routeConfig);
	
	function routeConfig($stateProvider){
		$stateProvider
			.state('transaksi.sewa', {
				url: '/sewa',
				templateUrl: 'app/pages/transaksi/sewa/sewa.html',
				//template: '<div class="abc"></div>',			
				controller: 'SewaCtrl',
				title: 'Sewa',
				sidebarMeta: {
					order: 0
				}
			});
		
	}	
	
})();