const express = require("express");
const path = require("path");

const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, "public")));

app.listen(3001, () => {
  console.log("Server listed on PORT 3001");
});
