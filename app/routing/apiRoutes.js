//Require men and women arrays
var menData = require("../data/men");
var womenData = require("../data/women");

/*this will handle the GET/POST from /api/friends
aka the API routes*/
module.exports = function(app) {

    //handle the GET, respond with all objects
    app.get("/api/friends", function(req, res) {
        res.json(menData+womenData);
    });

    //Handle the POST, respond with the closest match Object
    app.post("/api/friends", function(req, res) {

    	/*Variable to store the closest match object, will get overwritten everytime a new
    	closest match is found*/
        var closestMatch;

        /*The greatest possible difference is 40, so every time there's a closer match this gets
        overwritten*/
        var leastDifference = 41;

        //if searcher is female, search men array and push them to women array
        //else if searcher is male, search female array and push them to men array
        if (req.body.gender === "Female") {

        	/*nested loop, go through each person first, then go through
        	each of their scores for comparison*/
            for (i = 0; i < menData.length; i++) {

            	//total difference for THIS particular person
                var totalDifference = 0;
                for (j = 0; j < menData[i].scores.length; j++) {
                   /*comparing the searchers answer to THIS persons answer
                   and adding to totalDifference*/
                    totalDifference += Math.abs(parseInt(req.body.scores[j]) - parseInt(menData[i].scores[j]));
                    console.log(totalDifference);
                }

                /*If the difference between these two is the newest
                closest match, update closestMatch before 
                doing the next comparison*/
                if (totalDifference < leastDifference) {
                    leastDifference = totalDifference;
                    closestMatch = menData[i];
                    //for testing, verifying each new closest match is overwritten
                    console.log("New closest match is: " + closestMatch.friendName);
                }
            }

            /*Matchmaking is done, push this
            female searcher to the woman array and send back
            the closest match*/
            womenData.push(req.body);
            res.json(closestMatch);

        } else {
        	/*else if the searcher is male, do the same thing but
        	using the opposite arrays*/
        	for (i = 0; i < womenData.length; i++) {
                var totalDifference = 0;
                for (j = 0; j < womenData[i].scores.length; j++) {
                    totalDifference += Math.abs(parseInt(req.body.scores[j]) - parseInt(womenData[i].scores[j]));
                }
                if (totalDifference < leastDifference) {
                    leastDifference = totalDifference;
                    closestMatch = womenData[i];
                }
            }
            /*since this a male searcher, push to men array
            and respond with closest match*/
            menData.push(req.body);
            res.json(closestMatch);
        }
    });
}
