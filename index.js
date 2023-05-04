const Datastore = require("nedb");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.listen(3000, () => {
  console.log("listening");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
// #database
const database_1 = new Datastore("database.db");
database_1.loadDatabase();
console.log(database_1);

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_1.insert(data);
  response.json(data);
});
