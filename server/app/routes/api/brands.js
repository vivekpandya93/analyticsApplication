var router = require('express').Router();
var db = require('../../../lib/db.js');
var fs = require('fs');
var queries = require('../../queries');
var path = require('path');
var swigql = require('../../swigql')

var queryPath = function(name) {
		return  'src/server/app/queries/'+name+'.sql'
}

var formData = {
	locales: queries.getLocales();
}


var sqlTmpRevenue = swigql.compileFile(queryPath('revenue'));
var sqlTmpBrandInfo = swigql.compileFile(queryPath('IndividualBrandInfo'));
var sqlTmpNumber = swigql.compileFile(queryPath('number'));

router.get('/', function(req, res) {
formData.variables = req.query;

	if(formData.variables.department === 'All Departments') {
		delete formData.variables.department;
		delete formData.variables.category;
	}
	if(formData.variables.gender === 'All Genders') {
		delete formData.variables.gender;
	}

	if(formData.variables.category === 'All Categories') {
		delete formData.variables.category;
	}

	var statement = sqlTmpRevenue.render(formData)
	console.log("query:", statement.query)
	console.log("params:", statement.params)

	// var queryString = queries.getRightQueryString([formData.variables.from,formData.variables.to, formData.variables.gender, formData.variables.department, formData.variables.category], 'revenue.sql');
	db.query(statement.query, statement.params, function(err, rows) {
	  if (err) {
	  	throw err;
	  }
	  res.json({result: rows});
	});
});


router.get('/:name', function(req, res){
formData.variables = req.query;

	if(formData.variables.department === 'All Departments') {
		delete formData.variables.department;
		delete formData.variables.category;
	}

	if(formData.variables.gender === 'All Genders') {
		delete formData.variables.gender;
	}

	if(formData.variables.category === 'All Categories') {
		delete formData.variables.category;
	}

	formData.variables.spaced_name = req.params.name
	var statement = sqlTmpBrandInfo.render(formData)
	var queryString = queries.getRightQueryString([formData.variables.from, formData.variables.to, formData.variables.spaced_name, formData.variables.department, formData.variables.gender, formData.variables.category], 'IndividualBrandInfo.sql');
		db.query(statement.query, statement.params, function(err, rows) {
		  if (err) {
		  	throw err;
		  }

		  res.json({result: rows});
		});
});

router.get('/:sku', function(req, res){
	formData.variables = req.params.name 
	var statement = sqlTmpNumber.render(formData)
	// var query = queries.getRightQueryString(req.params,'number.sql');
	db.query(statement.query, statement.params, function(err, rows) {
	  if (err) {
	  	throw err;
	  }
 	  res.json({result: rows});
 	});
});

module.exports = router;
