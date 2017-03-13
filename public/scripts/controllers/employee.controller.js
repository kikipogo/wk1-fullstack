myApp.controller('EmployeeController', [ 'FactoryFactory', function(FactoryFactory){
  var self = this;
  self.employee = FactoryFactory.factoryEmployee;
}]);
