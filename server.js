const express = require("express");
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/notesapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/notes", notesRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});