const express = require("express");
const server = express();

const bodyParser = require("body-parser");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const handlebars = require("express-handlebars");
server.set("view engine", "hbs");
server.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
    })
);

server.use(express.static("public"));
const mongo_uri = '';
const mongoose = require('mongoose');
// mongoose.connect(mongo_uri);

const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

const controllers = ['routes'];
for (var i = 0; i < controllers.length; i++) {
    const ctrl = require('./controllers/' + controllers[i]);
    ctrl.add(server);
}

function finalClose() {
    mongoose.connection.close();
    process.exit();
}

process.on('SIGTERM', finalClose);
process.on('SIGINT', finalClose);
process.on('SIGQUIT', finalClose);

const port = process.env.PORT | 3000;
server.listen(port, function () {
    console.log("Listening at port " + port);
});