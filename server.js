//Require NPM modules express and body-parser
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Setup express and body-parser
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/*require apiRoutes and htmlRoutes from their respective files
so that we can keep them separate*/
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

/*start the server*/
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});