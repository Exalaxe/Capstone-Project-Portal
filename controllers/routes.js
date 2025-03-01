function add(server) {
    server.get("/", function (req, resp) {
        resp.redirect("/login");
    });
    server.get("/login", function (req, resp) {
        resp.render("login", {
            layout: "index",
            title: "Login",
        });
    });
    server.get("/home", function (req, resp) {
        resp.render("home", {
            layout: "index",
            title: "Home",
        });
    });
}

module.exports.add = add;