var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 15000
};

var pool = new pg.Pool(config);


router.get('/employee', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * from employee;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);
        }
      });//end of function(errorMakingQuery, result)
    }
  });//end of pool.connect
});//end og router.get

router.post('/employee', function(req, res){
  var newEmployee = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO employee (first_name, last_name, title, salary) VALUES ($1, $2, $3, $4);',
      [newEmployee.first_name, newEmployee.last_name,newEmployee.title, newEmployee.salary],
       function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });//end of function(errorMakingQuery, result)
    }
  });//end of pool.connect
});//end og router.get

// -> /delete
router.delete('/employee/delete/:id', function(req, res){
  var employeeId = req.params.id;
  // DELETE FROM books WHERE id=44;
  console.log('employee id to delete: ', employeeId);
  // Connecting to, and deleting row from the database
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' delete stuff!!!!!
      client.query('DELETE FROM employee WHERE id=$1;', // This is the SQL query
      [employeeId], // This is the array of things that replaces the $1, $2, $3 in the query
      function(errorMakingQuery, result){ // This is the function that runs after the query takes place
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });
}); // closing delete request


module.exports=router;
