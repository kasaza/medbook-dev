var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'medbook'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connection to medbook DB Successful...');
	}
});

module.exports = connection;