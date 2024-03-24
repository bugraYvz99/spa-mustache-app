const express = require("express");
const mustacheExpress = require("mustache-express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const config = require("../config/config");
const todoRoutes = require("./routers/todoRoutes");

dotenv.config();

const app = express();

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Mustache as template engine
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "../views");
app.set("view cache", false); // Disable template caching

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mybase")
  .then(() => console.log("MongoDB'ye bağlandı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Routes
app.use("/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Define routes for different pages
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    partials: { content: "home" },
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    partials: { content: "about" },
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    mainPartial: "contact", // Pass the content of the contact partial directly
  });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
