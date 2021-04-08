const fs = require('fs');
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {

        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });

    app.post("/api/notes", function(req, res) {
        
        let note = req.body;
        let id = (data.length).toString();
        note.id = id;
        data.push(note);

        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);
        });

        res.json(data);

    });

    app.delete("/api/notes/:id", function(req, res) {
        let id = req.params.id;
        let subId = 0;
        console.log(`Deleting note ${id}`);
        data = data.filter(currentNote => {
            return currentNote.id != id;
        });
        for (currentNote of data) {
            currentNote.id = subId.toString();
            subId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    });
}