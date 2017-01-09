(function () {
  'use strict';

  angular.module('BlurAdmin.pages.shuttle.spot', [
    "ui.select"
  ])
    .config(routeConfig);

  function routeConfig($stateProvider){
    $stateProvider
      .state('shuttle.spot', {
        url: '/spot',
        template: 'ini form crud spot',
        title: 'Spot',
        authenticate: true,
        role: ['admin'],
        sidebarMeta: {
          order: 0
        }
      });
  }
})();
