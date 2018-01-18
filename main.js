//gets currency from user selection
var coinApp = angular.module('coinApp', ['tw-currency-select','ngMaterialDatePicker']);
coinApp.controller('mainController', function($scope, $http) {
  

    $scope.title = "My Bitcoin Exchange";
    $scope.currencyChangeCount = 0;
    $scope.currencyCodeChangeCount = 0;

    $scope.total_usd_amount = 0.0;
    $scope.total_currency_amount = 0.0;
    $scope.total_usd_units = 0.0;
    $scope.total_currency_units = 0.0;
   
    $scope.currency_to_convert_to =  {code: 'NGN',  name: 'Nigerian Naira'};

    $scope.currenciesWithNames = [
      {code: 'EUR',  name: 'Euro'},
      {code: 'GBP', name: 'British Pound'},
      {code: 'NGN',  name: 'Nigerian Naira'},
      {code: 'CNY',  name: 'Chinese Yuan'},
      {code: 'CAD',  name: 'Canadian Dollars'},
      
  ];
  
    $scope.getPrice = function() { 
      $http({
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/currentprice/' + $scope.currency_to_convert_to.code + '.json'
      }).then(function successCallback(response) {
        
        $scope.rates = [];
          var bpi = response.data.bpi;
          var disclaimer = response.data.disclaimer;
          $scope.disclaimer=disclaimer;
          $scope.rates.push(bpi['USD']);
          $scope.rates.push(bpi[$scope.currency_to_convert_to.code]);
        
          
          $scope.calculateTotal();
          $scope.calculateUnits();
          console.log(response)
        }, function errorCallback(response) {
          console.error(response);
        });
    }
    $scope.getData = function() {   
      console.log("working")
      $http({
        method: 'GET',
        url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-10-01&end=2018-01-10"
      }).then(function successCallback(response) {
        
       $scope.history=response.data.bpi;
       console.log(response)
        }, function errorCallback(response) {
          console.error(response);
        });
    }

  
      $scope.calculateTotal = function() {   
      angular.forEach($scope.rates, function(bt_rate) {
       var total = bt_rate.rate_float * $scope.units;
        if (bt_rate.code == "USD") {
          $scope.total_currency_amount = 0.00;
          $scope.total_usd_amount = total.toFixed(2);      
        } else {    
          
            $scope.total_currency_amount = total.toFixed(2);
            $scope.total_usd_amount = 0.00; 
        };
      });
    };
        
    $scope.calculateUnits = function() {
      
      angular.forEach($scope.rates, function(bt_rate) {
        if (bt_rate.code == $scope.currency_to_convert_to.code) {
          var units = parseInt($scope.amount) / bt_rate.rate_float;
          if (bt_rate.code == "USD") {
            $scope.total_usd_units = units.toFixed(2);
            $scope.total_currency_units = 0.00;
          } else {
            
           $scope.total_currency_units = units.toFixed(2);
            $scope.total_usd_units = 0.00
          }
        }
      });
    };
  });
 
  (function () {
    'use strict';
    angular.module('mdDatetimePickerDemo', [
        'ngMaterialDatePicker'
      ])
      .controller('DemoCtrl', function ($scope) {
  
        var startOfWeek = moment().startOf('week');
        var endOfWeek = moment().endOf('week');
  
        var days = [];
        var day = startOfWeek;
  
        while (day <= endOfWeek) {
            days.push(day.format("YYYY-MM-DDTHH:mm:ssZ"));
            day = day.clone().add(1, 'd');
        }
  
        $scope.date = new Date();
        $scope.time = new Date();
        $scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.maxDate = moment().add(1, 'month');
        $scope.dates = days
  
      })
  
      
      
  })();
