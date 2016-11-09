var router = require('express').Router();
var db = require('../../../lib/db.js');
var fs = require('fs');
var queries = require('../../queries');
var path = require('path');
var swigql = require('../../swigql')
var _ = require ('lodash')

var queryPath = function(name) {
		return  'src/server/app/queries/'+name+'.sql'
}

var formData = {
	locales: queries.getLocales()
}


var sqlTmpRevenue = swigql.compileFile(queryPath('revenue'));
var sqlTmpBrandInfo = swigql.compileFile(queryPath('IndividualBrandInfo'));
var sqlTmpNumber = swigql.compileFile(queryPath('number'));
var sqlIndividualStock = swigql.compileFile(queryPath('total_available_stock'))

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

	var finalresult = []
	console.log("query:", statement.query)
	console.log("params:", statement.params)
		db.query(statement.query, statement.params, function(err, rows) {
		  if (err) {
		  	throw err;
		  }
		  console.log("rows", rows)
		  formData.variables.skus = [];
		  rows.forEach(function(row){
		  	formData.variables.skus.push(row.SKU)
		  });
 
	  	console.log("formdata.sku", formData.variables.sku)
	  	var innerStatement = sqlIndividualStock.render(formData)
		  db.query(innerStatement.query, innerStatement.params, function(err, skusAvailabilities) {
	  		console.log("in here", innerStatement.query)
	  		console.log("avalaibilities", skusAvailabilities)
	 			rows.forEach(function(row){
	 				skusAvailabilities.forEach(function(sku){
	 					if (sku.SKU === row.SKU) {
	 						row.Available_Stock = sku.Available_Stock
	 						finalresult.push(row)
	 					}
	 				})
	 			}) 
	 			console.log("final result", finalresult)
		  	res.json({result: finalresult});
	  	})

		
		});
	
});

router.get('/sku/:sku', function(req, res){
	console.log("sku", req.params.sku)
	formData.variables = req.params.sku
	var statement = sqlTmpNumber.render(formData)
	console.log("formData", formData)
	console.log("query:", statement.query)
	console.log("params:", statement.params)
	db.query(statement.query, statement.params, function(err, rows) {
	  	if (err) {
	  	throw err;
	  }
	 		 res.json({result: rows})
	 });
});


	  // skus = _.map(rows, function(row) {
	  // 	return row.simple_sku
	  // });

	  //select simple_sku, quantity from stock_summary where simple_sku in (?) => 'AE123', 'ae344', 'ae455'
 	  // db.query(statement.query, [skus], function(err, rows2) {
 	  // 	if (err) {
		  // 	throw err;
		  // }


 	  	// res.json({result: _.merge(rows, rows2);});	
 	
module.exports = router;
