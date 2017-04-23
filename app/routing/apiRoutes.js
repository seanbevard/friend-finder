/*Need to require the friends information from friends.js*/
var friendsData = require("../data/friends");

/*Need a module.exports that will handle any GET/POST requests
made for our JSON data*/
module.exports = function(app) {

    //GET from friend data
    app.get("/api/friends", function(req, res) {
    	//respond with the friends array
        res.json(friendsData);
    });


    //POST to friend data
}
