// HTML Route //

const path = require("path");


// export routes to show index.html and notes.html //
module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });
    
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/notes.html"));
    });
    
}