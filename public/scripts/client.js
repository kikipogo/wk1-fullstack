
var myApp = angular.module('myApp', ['ngRoute']);
console.log('angular working');

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/employee', {
      templateUrl: '/views/add-employee.html',
      controller: 'EmployeeController',
      controllerAs: 'ec'
    })
    .otherwise({
      redirectTo: 'employee'
    })
}]);
