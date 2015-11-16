var router = require('express').Router()
var mysql = require('mysql');
var db = require(__dirname +'/db.js')
var fs = require('fs')
var queries = require(__dirname+'/../../queries')

var getQuery = function(name) {
	return fs.readFileSync(__dirname + '/../../queries/'+name+'.sql').toString('utf8');
}

var formData = {}

router.get('/', function(req,res,next){
	formData = req.query;	

	if(formData.category === 'All Categories') {
		formData.category = undefined
	}
	if (formData.gender === 'Any') {
		 formData.gender = undefined
	}
	var queryString = queries.getRightQueryString(formData, 'revenue.sql')
	console.log("query:", queryString)
		db.query(queryString,[formData.from,formData.to,formData.category,formData.gender], function(err, rows, fields) {
		  if (err) throw err;
		  console.log(rows)
		  res.json({result: rows});
		});
	

})

router.get('/:name', function(req,res,next){
	formData.spaced_name = req.params.name.split('_').join(' ')
	if(formData.category === 'All Categories') {
		formData.category = undefined
	}
	if (formData.gender === 'Any') {
		 formData.gender = undefined
	}
	var queryString = queries.getRightQueryString(formData, 'IndividualBrandInfo.sql') 
	console.log("query:", queryString)

		db.query(queryString, [formData.from, formData.to, formData.spaced_name, formData.category, formData.gender],
			function(err, rows, fields) {
		  if (err) throw err;
		  res.json({result: rows});
		});

	

})


router.get('/:name/:sku', function(req, res, next){
	formData.sku = req.params.sku
	var query = getQuery('numberOfStockLeftFoReal')
		console.log("query:", query)
		db.query(query, [formData.spaced_name, req.params.sku], function(err, rows, fields) {
		  if (err) throw err;
	 	  res.json({result: rows});
	 	});
})

module.exports = router; 
