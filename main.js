//gets currency from user selection
var coinApp = angular.module('coinApp', ['tw-currency-select']);
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
      {code: 'CAD',  name: 'Canadian Dollars'}
  ];
  
    $scope.getPrice = function() {
      console.log("Trying to get price");   
      $http({
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/currentprice/' + $scope.currency_to_convert_to.code + '.json'
      }).then(function successCallback(response) {
        $scope.rates = [];
          var bpi = response.data.bpi;
          $scope.rates.push(bpi['USD']);
          $scope.rates.push(bpi[$scope.currency_to_convert_to.code]);
        }, function errorCallback(response) {
          console.error(response);
        });
    }
  
    $scope.calculateTotal = function() {
      angular.forEach($scope.rates, function(bt_rate) {
     var total = bt_rate.rate_float * parseInt($scope.units);
  
        $scope.$watch('units',function(oldValue,newValue){
        if (bt_rate.code == "USD") {
          $scope.total_usd_amount ="0"
         total = bt_rate.rate_float * parseInt(oldValue);
          $scope.total_usd_amount = total;
        console.log( `USD AMOUNT ${$scope.total_usd_amount}`);
         console.log(` Total ${$scope.total}`) ;
         console.log(` NewValue ${newValue}`) 
         
        } else {
          
          $scope.$watch('units',function(oldValue,newValue) {
            total = bt_rate.rate_float * parseInt(oldValue);
            $scope.total_currency_amount = total;

            console.log( `Amount  ${$scope.total_currency_amount}`);
          }); 
        }
      });
    });
    };
  
    $scope.calculateUnits = function() {
      angular.forEach($scope.rates, function(bt_rate) {
        if (bt_rate.code == $scope.currency_to_convert_to.code) {
          var units = parseInt($scope.amount) / bt_rate.rate_float;

          if (bt_rate.code == "USD") {
            $scope.total_usd_units = units;
            $scope.total_currency_units = 0;
          } else {
           $scope.total_currency_units = units;
            $scope.total_usd_units = 0
          }
        }
      });
    };
  });
