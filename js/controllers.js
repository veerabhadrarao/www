    angular.module('starter.controllers', ['ionic'])
    .constant('FORECASTIO_KEY', '3e04fddcee8cd3ce1e933be51dc202c8')
    .controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
        //read default settings into scope
        console.log('inside home');
        $scope.city  = DataStore.city;
       // alert($scope.city);
        var latitude  =  DataStore.latitude;
        //alert(latitude);
        var longitude = DataStore.longitude;
        //alert(longitude);

        //call getCurrentWeather method in factory ‘Weather’
        Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
          $scope.current = resp.data;
          console.log('GOT CURRENT', $scope.current);
          
          //debugger;
        }, function(error) {
          alert('Unable to get current conditions');
          console.error(error);
        });

    })
    .controller('LocationsCtrl', function($scope,$state, Cities,DataStore) {
      $scope.cities = Cities.all();

      $scope.changeCity = function(cityId) {
        alert(cityId);
        //get lat and longitude for seleted location
        var lat  = $scope.cities[cityId].lat; //latitude

        var lgn  = $scope.cities[cityId].lgn; //longitude
        var city = $scope.cities[cityId].name; //city name
        alert(city);

        DataStore.setCity(city);
        DataStore.setLatitude(lat);
        DataStore.setLongitude(lgn);

        $state.go('tab.home');
        //alert(JSON.stringify(DataStore));
      }
    })
    .controller('SettingsCtrl', function($scope) {
        //manages app settings
    });