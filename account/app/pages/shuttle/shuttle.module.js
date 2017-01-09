(function (){
  'use strict';
  angular.module('BlurAdmin.pages.shuttle', [
    "ui.select"
    //'BlurAdmin.pages.transaksi',
    //'BlurAdmin.pages.shuttle.spot'
  ])
  .service('SpotService', SpotService)
  .config(routeConfig)

  function routeConfig($stateProvider, $urlRouterProvider, SpotServiceProvider){
	  //console.log(SpotServiceProvider.$get().fak());
    $stateProvider
    .state('shuttle', {
      url: '/shuttle',
      template: '<div ui-view></div>',
      abstract: true,
      title: 'Shuttle',
      sidebarMeta: {
        icon: 'ion-grid',
        order: 200
      }
    })
    .state('shuttle.spot', {
      url: '/spot',
      templateUrl: 'app/pages/shuttle/spot/spot.html',
      controller: 'SpotPageCtrl',
	  controllerAs: 'SpotPageVm',
      title: 'Spot',
      authenticate: true,
      role: ['admin'],
	  
	  resolve: {
		 
		spots: function(){
			return SpotServiceProvider.$get().spots();
		}
		
		/*
		fakfak: function(){ 
			return SpotServiceProvider.$get().fak();
		},
		*/
		/*
		fakfak: function(){
			return {a: "ini fak fak"};
		},
		*/
		//fak: "asu ini fak aja"
	  },
	  
      sidebarMeta: {
        order: 0
      }
    });
    $urlRouterProvider.when('/shuttle', '/shuttle/spot');

  }
  
  function SpotService($http){

    var parseAppId = 'gMKfl1wDyk3m6I5x0IrIjJyI87sumz58';
	
	this.fak = function(){
		return "ini function fak";
	}
	
	this.varFak = "var fak";

    function config(){
      this.headers = {
        'X-Parse-Application-Id': parseAppId
      }
    }

    var getBasicConfig = {
      headers: {
        'X-Parse-Application-Id' : parseAppId
      }
    };



    this.kota = function(){
      var kotaConfig = new config();
      kotaConfig.params = {
        where: {
          kecamatan: {
            '$exists': false
          }
        }
      }

      return $http.get('http://128.199.249.233:1337/parse/classes/wilayah', getBasicConfig).then(function (response){
        return response.data.results;
      }, function (error){
        return error;
      });
    }
	
	this.spots = function (){
		return $http.get('http://128.199.249.233:1337/parse/classes/spot', getBasicConfig).then(function (response){
			return response.data.results;
		}, function (error){
			return error;
		});
	}

  }


})();
