const express = require("express"),
      app = express(),
      path = require("path"),
      server = require("http").createServer(app);

      main = path.resolve("./frontend/html/home.html"),
      css = path.resolve("./frontend/css"),
      js = path.resolve("./frontend/js"),
      p5js = path.resolve("./node_modules/p5/lib");

app.use("/main", express.static(main));
app.use("/css", express.static(css));
app.use("/js",express.static(js));
app.use("/p5js", express.static(p5js));

server.listen(process.env.PORT || 3000);
console.log("Server running on port: ",process.env.PORT || 3000);

app.get('/',function(req,res){
    res.sendFile(main);
});

