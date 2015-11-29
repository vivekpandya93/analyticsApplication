var router = require('express').Router();
var db = require('../../../lib/db.js');
var fs = require('fs');
var queries = require('../../queries');
var path = require('path');

var getQuery = function(name) {
	return fs.readFileSync(path.join(__dirname, '../..', 'queries', `${name}.sql`)).toString('utf8');
};

var formData = {};


router.get('/', function(req, res){
	formData = req.query;

	if(formData.department === "All Departments") {
		formData.department = undefined; 
		formData.category = undefined;
	}
		if(formData.gender === "All Genders") {
		formData.gender = undefined; 
	}
	
	console.log('formData', formData);
	var queryString = queries.getRightQueryString(formData, 'revenue.sql');
	db.query(queryString,[formData.from,formData.to, formData.gender, formData.department, formData.category], function(err, rows) {
		console.log('query', queryString);
	  if (err) {
	  	throw err;
	  }


/*router.get('/:name', function(req,res,next){
	formData = req.query;	
	if(formData.department === "All Departments") {
		formData.department = undefined; 
	}
	if(formData.gender === "All Genders") {
		formData.gender = undefined; 
	}
	formData.spaced_name = req.params.name.split('_').join(' ')
	var queryString = queries.getRightQueryString(formData, 'IndividualBrandInfo.sql') 
		db.query(queryString, [formData.from, formData.to, formData.name, formData.department, formData.gender, formData.category],
			function(err, rows, fields) {
		  if (err) throw err;
		  res.json({result: rows});
		});
})*/

router.get('/:name', function(req, res){
	formData = req.query;

	var queryString = queries.getRightQueryString(formData, 'IndividualBrandInfo.sql');
	db.query(queryString, [formData.from, formData.to, formData.name, formData.department, formData.gender, formData.category],
		function(err, rows) {
	  if (err) {
	  	throw err;
	  }

	  res.json({result: rows});
	});
});


router.get('/:name/:sku', function(req, res){
	var query = getQuery('numberOfStockLeftFoReal');
	db.query(query, [req.params.name, req.params.sku], function(err, rows) {
	  if (err) {
	  	throw err;
	  }

 	  res.json({result: rows});
 	});
});

module.exports = router;
