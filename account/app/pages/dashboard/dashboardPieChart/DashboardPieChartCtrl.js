/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';
  
  var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl)
      .factory('dashboardFactory', dashboardFactory);

  /** @ngInject */
	
  function dashboardFactory($http) {
  	
  		var dashboardFactory = {};

		dashboardFactory.totalCustomer = function () {
			
			var config = {
				headers: {
					'X-Parse-Application-Id' : parseAppId			
				},
				params: {
					count: 1,
					limit: 0,
					where: {
						role_name: 'customer',
					}
				}
			}
			
			return $http.get('http://128.199.249.233:1337/parse/users', config).then(function (response) {
				return response.data.count;	
			}, function (error) {
				return error;			
			});
				
		}  	
		
		dashboardFactory.totalPartner = function () {
			var config = {
				headers: {
					'X-Parse-Application-Id' : parseAppId				
				},
				params: {
					count: 1,
					limit: 0,
					where: {
						role_name: 'partner',					
					}				
				}
			}	
			
			return $http.get('http://128.199.249.233:1337/parse/users', config).then(function (response) {
				return response.data.count
			}, function (error){
				return error;
			});	
		}	
  		
  		return dashboardFactory;
  		
  }
  
  
  function DashboardPieChartCtrl($scope, $q, $timeout, baConfig, baUtil, dashboardFactory) {
  	//$scope.totalCustomer = 6;
   //console.log(dashboardFactory.totalCustomer());
  	
  	
  	var totalCustomerPromise = dashboardFactory.totalCustomer().then(function (response){
      	return response;
      	//return console.log(response);
      });
      
   var totalPartnerPromise = dashboardFactory.totalPartner().then(function (response) {
   		return response;
   });
      
      
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

    $q.all({
    	totalCustomer: totalCustomerPromise,
    	totalPartner: totalPartnerPromise
    }).then(function (response) {
    	console.log(response);
    	
    	$scope.charts = [
    	{
    		color: pieColor,
    		description: 'Jumlah Konsumen',
    		stats: response.totalCustomer,
    		icon: 'person'
    	},
		{
			color: pieColor,
			description: 'Jumlah Partner',
			stats: response.totalPartner,
			icon: 'face'
		}    	
    	];
    	
    
    });
    /*
    $scope.charts = [{
      color: pieColor,
      description: 'Total Transaksi',
      stats: '0',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Jumlah Konsumen',
      stats: '0',
      icon: 'money',
    }, {
      color: pieColor,
      description: 'Partner Sewa',
      stats: '0',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Partner Shuttle',
      stats: '0',
      icon: 'refresh',
    }
    ];
    */

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();