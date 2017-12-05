var connection = require ('./connection.js');



// Helper function for generating My SQL syntax
function objectToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

function createQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Create the ORM object to perform SQL queries
var orm = {
	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},

	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts into the desired table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += createQuestionMarks(vals.length);
		queryString += ") ";


		// query the database
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results 
			cb(result);
		});
	},

	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objectToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;


		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	}
};

// Export the orm object for use in other modules
module.exports = orm;