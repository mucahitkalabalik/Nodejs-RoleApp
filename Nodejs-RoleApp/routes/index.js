var express = require("express");
var router = express.Router();

const fs = require("fs");

let routes = fs.readdirSync("./routes");

console.log("Routes: ", routes);


routes.forEach((route) => {
  if (route === "index.js") return;
  let routeName = route.split(".")[0];
  let routePath = `./${route}`;
  let routeFile = require(routePath);
  router.use(`/${routeName}`, routeFile);
});

module.exports = router;
