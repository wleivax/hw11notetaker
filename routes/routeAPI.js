// API Route //
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(data);
    });

    app.get("/api/notes/:id", function(req, res) {
        res.json(data[Number(req.params.id)]);
    });

    app.post("/api/notes", function(req, res) {
        let newAdd = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newAdd.id = uniqueId;
        data.push(newAdd);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    
    });

    // route to delete entries in db.json // 
    app.delete("/api/notes/:id", function(req, res) {
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Delete entry with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }

        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

};

