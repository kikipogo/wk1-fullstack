myApp.factory('FactoryFactory', ['$http', function($http){
  var factoryEmployee = { list: [] };
  var self = this;



  //
  // getEmployee();



  function getEmployee() {
    $http({
      method: 'GET',
      url: '/employee'
    }).then(function(response) {
      console.log('response from factory: ', response);
      console.log('response.data from factory: ', response.data);
      factoryEmployee.list = response.data;
      updateMonthyTotal();
    });
  }

  getEmployee();


  factoryEmployee.addEmployee = function(newEmployee) {
    $http({
      method: 'POST',
      url: '/employee',
      data: newEmployee
    }).then(function(response) {
      getEmployee();
      console.log('response from factory: ', response);
    });
  };


  factoryEmployee.deleteEmployee = function(employee){
    console.log('delete was clicked');
    console.log(employee);
    $http({
      method: 'DELETE',
      url: '/employee/delete/' + employee.id
    }).then(function(response){
      getEmployee();
    })
  };

  function updateMonthyTotal(){
    var sum = 0;
    for (var i = 0; i < factoryEmployee.list.length; i++) {
      sum += parseInt(factoryEmployee.list[i].salary);
    }
    factoryEmployee.sum = sum;
  }
  return {
    factoryEmployee: factoryEmployee
  };




}]);
