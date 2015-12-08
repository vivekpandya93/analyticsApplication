var router = require('express').Router();
var db = require('../../../lib/db.js');
var fs = require('fs');
var queries = require('../../queries');
var path = require('path');
var swigql = require('../../swigql')

var getQuery = function(name) {
	return fs.readFileSync(path.join(__dirname, '../..', 'queries', `${name}.sql`)).toString('utf8');
};

var queryPath = function(name) {
		return  '../../../app/queries/'+name+'.sql'
}

var formData = {}


var sqlTmpRevenue = swigql.compileFile(queryPath('revenue'));
var sqlTmpBrandInfo = swigql.compileFile(queryPath('IndividualBrandInfo'));
var sqlTmpNumber = swigql.compileFile(queryPath('number'));

router.get('/', function(req, res) {
formData = req.query;

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

	var statement = sqlTmpRevenue.render(formData)

	// var queryString = queries.getRightQueryString([formData.from,formData.to, formData.gender, formData.department, formData.category], 'revenue.sql');
	db.query(statement.query, statement.params, function(err, rows) {
	  if (err) {
	  	throw err;
	  }
	  res.json({result: rows});
	});
});


router.get('/:name', function(req, res){
formData = req.query;

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
	var statement = sqlTmpBrandInfo.render(formData)
	// var queryString = queries.getRightQueryString([formData.from, formData.to, formData.spaced_name, formData.department, formData.gender, formData.category], 'IndividualBrandInfo.sql');
		db.query(statement.query, statement.params, function(err, rows) {
		  if (err) {
		  	throw err;
		  }

		  res.json({result: rows});
		});
});

router.get('/:sku', function(req, res){
	formData = req.params.name 
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
