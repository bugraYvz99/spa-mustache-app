const express = require("express");
const mustacheExpress = require("mustache-express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const config = require("./config/config");
const todoRoutes = require("./routers/todoRoutes");
const fs = require("fs");

dotenv.config();

const app = express();

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Mustache as template engine
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.set("view cache", false); // Disable template caching

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Define routes for different pages
app.get("/", (req, res) => {
  res.render("layout", {
    title: "Home",
    partials: { content: "partials/home" },
  });
});

app.get("/about", (req, res) => {
  res.render("layout", {
    title: "About",
    partials: { content: "partials/about" },
  });
});

app.get("/contact", (req, res) => {
  fs.readFile("views/contact.mustache", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contact partial:", err);
      return res.status(500).send("Internal Server Error");
    }

    res.render("layout", {
      title: "Contact",
      mainPartial: data, // Pass the content of the contact partial directly
    });
  });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
