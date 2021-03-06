/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components', [
    'BlurAdmin.pages.components.mail',
    'BlurAdmin.pages.components.timeline',
    'BlurAdmin.pages.components.tree',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, roleProvider) {
  	
  	//console.log(roleProvider.currentRole());
  	//http://jsfiddle.net/thomporter/zjFp4/1/
  	if(roleProvider.currentRole() == "partner"){
  	
    $stateProvider
        .state('components', {
          url: '/components',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Components',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 200,
          },
        });
    
   }
   
  }

})();
