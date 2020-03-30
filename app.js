const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs"); // sets the template pacakge to ejs so we dont need to type .ejs to get an ejs file

app.get("/", function(req, res){
	res.render("search");
})

app.get("/results", function(req, res){ // request / response
	let query = req.query.search; // get the results of the input via name (search)
	let url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			let data = JSON.parse(body); // Turn the JSON into a JS object via parse
			res.render("results", {data: data}); // render the results.ejs page, passing in the data variable, called 'data'
		}
	})
})



app.listen(process.env.PORT || 3000, function() { 
  console.log('Movie App has started - Server listening on port 3000'); 
})