/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
  	 //'angularCSS',
    'ui.router',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.shuttle',
    'BlurAdmin.pages.transaksi',
    'BlurAdmin.pages.ui',
    //'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    //'BlurAdmin.pages.tables',
    //'BlurAdmin.pages.charts',
    //'BlurAdmin.pages.maps',
    //'BlurAdmin.pages.profile',
    ])
	.directive('resolving', resolving)
      .config(routeConfig).run(function ($rootScope, $state, authFactory){

      	$rootScope.$state = $state;

			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


				authFactory.isAuthenticated().then(function (response) {
					//console.log(toState);

					/*
					if(toState.authenticate && (toState.role == "all")) {
						$state.transitionTo(toState.name);
					}else
					*/

					if(toState.authenticate && (toState.role.indexOf(authFactory.currentRole()) > -1 )){
						$state.transitionTo(toState.name);
					}else{
						$state.transitionTo('dashboard');
					}

				}, function (error) {
					event.preventDefault();
					//console.log("error");
					//window.location.href = "http://" + window.location.host + "/account/auth.html";
					window.location.href = "http://" + window.location.host + "/frontend/account/auth.html";
				});
			});
      });

  /** @ngInject */
  function routeConfig($urlRouterProvider, $stateProvider, baSidebarServiceProvider) {

    /*
    $stateProvider

    .state('home', {
    	url: '/home',
    	abstract: true,
    	templateUrl: 'main.html',
    	authenticate: true,
    	//css: 'app/main.css',
    })


    .state('login', {
    	url: '/login',
    	templateUrl: 'login.html',
    	title: 'Login',
    	authenticate: false,
    	css: 'app/auth.css'
    });
    */
	//console.log(authFactoryProvider.$get().currentRole());
	//console.log(authFactoryProvider.$get());
	//console.log(authFactoryProvider);
	//console.log(baSidebarServiceProvider);
    $urlRouterProvider.when('', '/dashboard');

	 /*
    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Menu Level 1',
      icon: 'ion-ios-more',
      subMenu: [{
        title: 'Menu Level 1.1',
        disabled: true
      }, {
        title: 'Menu Level 1.2',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          disabled: true
        }]
      }]
    });
    */
  }

  function resolving($rootScope){
	  return {
		  link: function(scope, element){
			  element.addClass('ng-hide');
			  var unregister = $rootScope.$on('$routeChangeStart', function(){
				  elemetn.removeClass('ng-hide');
			  });
			  scope.$on('$destroy', unregister);
		  }
	  }
  }
})();
