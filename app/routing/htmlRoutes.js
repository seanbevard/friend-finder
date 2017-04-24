//todo:  find a way to handle 404 (not found) requests

//Require path
var path = require("path");

//export html routes
module.exports = function(app) {
    //handle GET requests for each file path


    // /survey will point to survey.html
    app.use("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"))
    })

    //sendFiles for images. todo: find a better way to do this.
    app.use("/orlando.png", function(req, res) {
        res.sendFile(path.join(__dirname, "/../images/orlando.png"));
    });
    app.use("/lionsonly.jpg", function(req, res) {
        res.sendFile(path.join(__dirname, "/../images/lionsonly.jpg"));
    });
    app.use("/pride.png", function(req, res) {
        res.sendFile(path.join(__dirname, "/../images/pride.png"));
    });
    //Root path will point to home.html
    app.use("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

}
