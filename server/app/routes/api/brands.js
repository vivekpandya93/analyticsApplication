var router = require('express').Router()
var mysql = require('mysql');
var db = require(__dirname +'/db.js')
var fs = require('fs')
var queries = require(__dirname+'/../../queries')
var nodeExcel = require('excel-export');

var getQuery = function(name) {
	return fs.readFileSync(__dirname + '/../../queries/'+name+'.sql').toString('utf8');
}

var formData = {}

router.get('/', function(req,res,next){
	formData = req.query;	
		console.log("formData", formData)
	var queryString = queries.getRightQueryString(formData, 'revenue.sql')
	console.log("queryString outside:", queryString)
		db.query(queryString,[formData.from,formData.to, formData.gender, formData.department, formData.category], function(err, rows, fields) {
			console.log("query", queryString)
		  if (err) throw err;
		  console.log(rows)
		  res.json({result: rows});
		});
})

router.get('/:name', function(req,res,next){
	formData = req.query;	
	console.log("formData", formData)
	formData.spaced_name = req.params.name.split('_').join(' ')
	var queryString = queries.getRightQueryString(formData, 'IndividualBrandInfo.sql') 
		db.query(queryString, [formData.from, formData.to, formData.name, formData.department, formData.gender, formData.category],
			function(err, rows, fields) {
		  if (err) throw err;
		  res.json({result: rows});
		});
})


router.get('/:name/:sku', function(req, res, next){
	var query = getQuery('numberOfStockLeftFoReal')
		db.query(query, [req.params.name, req.params.sku], function(err, rows, fields) {
		  if (err) throw err;
	 	  res.json({result: rows});
	 	});
})





module.exports = router; 
