(function (){
  'use strict';

  angular.module('BlurAdmin.pages.shuttle')
    .controller('SpotPageCtrl', SpotPageCtrl)
    .controller('SpotAddCtrl', SpotAddCtrl)
    .directive('selectpicker', selectpicker);

  /** @ngInject */
  function selectpicker() {
    return {
      restrict: 'A',
      require: '?ngOptions',
      priority: 1500, // make priority bigger than ngOptions and ngRepeat
      link: {
        pre: function(scope, elem, attrs) {
          elem.append('<option data-hidden="true" disabled value="">' + (attrs.title || 'Select something') + '</option>')
        },
        post: function(scope, elem, attrs) {
          function refresh() {
            elem.selectpicker('refresh');
          }

          if (attrs.ngModel) {
            scope.$watch(attrs.ngModel, refresh);
          }

          if (attrs.selectModel) {
            scope.$watch(attrs.selectModel, refresh, true);
          }

          if (attrs.ngDisabled) {
            scope.$watch(attrs.ngDisabled, refresh);
          }

          elem.selectpicker({ dropupAuto: false, hideDisabled: true });
        }
      }
    };
  }

  function SpotAddCtrl($scope, wilayah){

    var vm = this;

    vm.cities = [];
    vm.kecamatan = [];
    vm.resultsKecamatan = [];

    for(var i in wilayah){
      if(typeof wilayah[i].kecamatan == 'undefined'){
        vm.cities.push(wilayah[i]);
      }else{
        vm.kecamatan.push(wilayah[i]);
      }
    }

    vm.citySelected = "";
    vm.kecamatanSelected = "";
    vm.spotName = "";
    vm.address = "";

    vm.coba = function(){

        console.log(vm.citySelected.kota);
        console.log(vm.kecamatanSelected.kecamatan);

      }

    vm.searchKecamatan = function(){

      vm.resultsKecamatan = [];
      for(var i in vm.kecamatan){
        if(vm.kecamatan[i].kota == vm.citySelected.kota){
          vm.resultsKecamatan.push(vm.kecamatan[i]);
        }
      }

    }

    //console.log(wilayah);
    //MasterService.config();

  }

  function SpotPageCtrl($scope, $filter, $uibModal, editableOptions, editableThemes, SpotService, spots){

    var vm = this;
	
	vm.smartTablePageSize = 2;

    $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: SpotAddCtrl,
        controllerAs: 'SpotAddVm',
		//windowClass: 'center-modal',
        size: size,
        resolve: {
          /*
		  wilayah: SpotService.kota().then(function (response){
            return response;
          }, function (error){
            return error;
          })*/
		  wilayah: function(){
			  return SpotService.kota();
		  }
        }
      });
    }

    $scope.kotas = [
      { label: 'Hot Dog', value: 1 },
      { label: 'Burger', value: 2},
      { label: 'Sugar, Spice', value: 3},
      { label: 'Baby', value: 4},
    ];
     $scope.names = ["Emil", "Tobias", "Linus"];

	 //vm.spots = 
	 //SpotService.spots().then(function (response){return vm.spots = response}, function(error){return error});
	vm.spots = spots;
	 //console.log(vm.spots);
    /*
    $scope.spots = [
      {
        objectId: 1,
        name: 'Juanda T1',
        address: 'JL. Terminal 1',
        kota: 1
      },
      {
        objectId: 2,
        name: 'Juanda T2',
        address: 'Jl. Terminal 2',
        kota: 2
      }
    ];

    $scope.wilayah = [
      {
        value: 1,
        kota: 'Kab. Sidoarjo',
        kecamatan: 'Betro'
      },
      {
        value: 2,
        kota: 'Kota Surabaya',
        kecamatan: 'Mulyorejo'
      }
    ];

    $scope.showKota = function(spot) {
      console.log('showkota');
      var selected = [];
      if(spot.kota) {
        selected = $filter('filter')($scope.wilayah, {value: spot.kota});
      }
      console.log(selected);
      return selected.length ? selected[0].kota : 'Not Set';
    };
    */
	
	//console.log(SpotServiceCok.cok);
	//console.log(SpotService.fak);
	//console.log(fakfak);

  }

})();
