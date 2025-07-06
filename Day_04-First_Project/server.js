const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server Home Page 🙏🙏🥰");
});

// Make  a create note featur using POST API

app.use(express.json());

let note = [];
app.post("/notes", (req, res) => {
  console.log(req.body);
  note.push(req.body);
  res.json({
    messege: "Notes ➕ Added SuccesFully🎉🎉",
  });
});

// Make a API that show an notes using .get() method

app.get("/notes", (req, res) => {
  res.json(note);
});

// now make Update Featur using PATCH() method

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const { heading } = req.body;
  const { content } = req.body;

  note[index].heading = heading;
  note[index].content = content;

  res.json({
    Massege: "Notes Updated SuccessFullY ✅🎉🎉",
  });
});

// now make a delet an note feature using .DELETE() method
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete note[index];
  res.json({
    massege: " Note Deleted ❌❌  Succesfully ",
  });
});

app.listen(3000, () => {
  console.log("Server is runnig at Port : 3000");
});
