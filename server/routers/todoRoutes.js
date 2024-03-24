const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Get all todos and render todos page
router.get("/", async (req, res) => {
  try {
    // Get all todos
    const todos = await todoController.getAllTodos();
    // Render todos page with todos data
    res.render("todos", {
      title: "Todos",
      todos: todos, // Pass todos data to todos.mustache
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new todo
router.post("/", todoController.createTodo);

// Update a todo
router.put("/:id", todoController.updateTodo);

// Delete a todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
