const express = require("express");
const db = require("./config/db");
const useRoutes = require("./routers"); 

const app = express();
const port = 1503;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

useRoutes(app);

app.listen(port, async () => {
  await db();
  console.log("Server running at http://localhost:" + port);
});