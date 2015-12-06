var router = require('express').Router();
var db = require('../../../lib/db.js');
var fs = require('fs');
var queries = require('../../queries');
var path = require('path');

var getQuery = function(name) {
	return fs.readFileSync(path.join(__dirname, '../..', 'queries', `${name}.sql`)).toString('utf8');
};

router.get('/', function(req, res) {
	var formData = req.query;

	if(formData.department === 'All Departments') {
		delete formData.department;
		delete formData.category;
	}
	if(formData.gender === 'All Genders') {
		delete formData.gender;
	}

	if(formData.category === 'All Categories') {
		delete formData.category;
	}

	var queryString = queries.getRightQueryString(formData, 'revenue.sql');
	db.query(queryString, function(err, rows) {
	  if (err) {
	  	throw err;
	  }

	  res.json({result: rows});
	});
});


router.get('/:name', function(req, res){
	var formData = req.query;

	if(formData.department === 'All Departments') {
		delete formData.department;
		delete formData.category;
	}

	if(formData.gender === 'All Genders') {
		delete formData.gender;
	}

	if(formData.category === 'All Categories') {
		delete formData.category;
	}

	formData.spaced_name = req.params.name
	var queryString = queries.getRightQueryString(formData, 'IndividualBrandInfo.sql');
		db.query(queryString, function(err, rows) {
		  if (err) {
		  	throw err;
		  }

		  res.json({result: rows});
		});
});

router.get('/:name/:sku', function(req, res){
	var query = queries.getRightQueryString(req.params,'number.sql');
	db.query(query, function(err, rows) {
	  if (err) {
	  	throw err;
	  }

 	  res.json({result: rows});
 	});
});

module.exports = router;
