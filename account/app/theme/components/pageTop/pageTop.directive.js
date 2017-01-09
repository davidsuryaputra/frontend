/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop);
      //.controller('pageTopCtrl', pageTopCtrl);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: function pageTopCtrl($scope, $http, authFactory, sessionFactory){
					$scope.logout = function () {
					 	authFactory.logout().then(function (response){
					 		
					 		sessionFactory.destroy('role');
					 		sessionFactory.destroy('sessionToken');
					 		sessionFactory.destroy('user_id');
					 		sessionFactory.destroy('isLoggedIn');
					 		sessionFactory.destroy('fb_id');
					 		sessionFactory.destroy('fb_expiration_date');
					 		sessionFactory.destroy('fb_access_token');
					 		window.location.href = "http://" + window.location.host;
					 	
					 	}, function (error) {
					 		
					 		console.log(error);
					 	
					 	});	
					}
 			 }
    };
  }
  
  

})();