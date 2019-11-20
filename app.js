const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mailer = require("./nodemailer");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));

let contactErrorName, contactErrorEmail, contactErrorMessage;

app.get("/", function(req, res) {
  res.render("index", {
    contactErrorName,
    contactErrorEmail,
    contactErrorMessage
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  if (!req.body.username && req.body.email && req.body.text)
    return res.render("index", {
      contactErrorName: "Please enter your name ",
      contactErrorEmail: "",
      contactErrorMessage: ""
    });
  if (!req.body.username && !req.body.email && req.body.text)
    return res.render("index", {
      contactErrorName: "Please enter your name ",
      contactErrorEmail: "| Please enter correct email ",
      contactErrorMessage: ""
    });
  if (!req.body.username && !req.body.email && req.body.text.length < 10)
    return res.render("index", {
      contactErrorName: "Please enter your name ",
      contactErrorEmail: "| Please enter correct email ",
      contactErrorMessage: "| Your message must be more than 10 characters "
    });
  if (req.body.username && !req.body.email && req.body.text.length < 10)
    return res.render("index", {
      contactErrorName: "",
      contactErrorEmail: "| Please enter correct email ",
      contactErrorMessage: "| Your message must be more than 10 characters "
    });
  if (req.body.username && !req.body.email && req.body.text)
    return res.render("index", {
      contactErrorName: "",
      contactErrorEmail: "| Please enter correct email ",
      contactErrorMessage: ""
    });
  if (req.body.username && req.body.email && req.body.text.length < 10)
    return res.render("index", {
      contactErrorName: "",
      contactErrorEmail: "",
      contactErrorMessage: "| Your message must be more than 10 characters "
    });
  const message = {
    from: "cuda.test@ukr.net",
    to: "cuda.test@ukr.net",
    subject: "cuda.test@ukr.net",
    text: req.body.text
  };
  mailer(message);
  res.redirect("/#contact");
});

app.listen(port, function() {
  console.log("server starting on 3000 port");
});
