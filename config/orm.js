
// O.R.M. - functions that take inputs and conditions and turns them into database commands like SQL.

var connection = require("./connection.js");

function printQuestionMarks(num) {
  // this simply sets the placehoder ? in the query string for the values that will be placed in the DB
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


function objToSql(ob) {
  // column1=value, column2=value2,... this is good for multiple column and value updates, but in
  // this homework assignmnet there is only one column to update
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}


var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result); // callback function returns result object
    });
  },

  
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length); // ? placehoder for values for query to enter in DB
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result); // callback function returns result object
    });
  },
  

  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);  // columns and values to update, in this case, just setting devoured column to true
    queryString += " WHERE ";
    queryString += condition; // set where the id is that of the selected burger

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result); // callback function returns result object
    });
  }
};

module.exports = orm;