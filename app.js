const express = require("express");
const date = require(__dirname + "/date.js")

const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) { 
    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems: items
    })
})

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list == "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server Running in 3000");
})