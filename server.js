const express = require("express");
const mongoose = require("./config/database");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
var jwt = require("jsonwebtoken");

const app = express();
app.set("secretKey", "nodeRestApi"); // jwt secret token

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);
app.use(express.json());
app.get("/", function (req, res) {
    res.json("Evaluation nodejs");
});
app.use("/tasks", tasks);
app.use("/users", users);


app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(3000, function () {
    console.log("Node server listening on port 3000");
});
