const express = require("express");
const app = express();

//process.env["NODE_ENV"] = "test"

require("./startUp/db")();
require("./startUp/config")();
require("./startUp/routes")(app);

app.get("/", (req, res)=>{
  res.send("hello world");
})

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listning on Port : ${port} `, this.address().port, app.settings.env);
});

module.exports = server;
