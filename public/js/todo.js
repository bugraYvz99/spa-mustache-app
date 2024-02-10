const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const todoText = document.getElementById("todoText");

// Function to fetch todos from the server and render them
const fetchTodos = async () => {
  try {
    const response = await fetch("/todos");
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

// Function to render todos
const renderTodos = (todos) => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <span>${todo.text}</span>
            <button data-id="${todo.id}">Delete</button>
        `;
    todoList.appendChild(todoItem);
  });
};

// Add event listener for form submission
todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = todoText.value.trim();
  if (text) {
    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      todoText.value = "";
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
});

// Add event listener for todo deletion
todoList.addEventListener("click", async (event) => {
  if (event.target.tagName === "BUTTON") {
    const todoId = event.target.dataset.id;
    try {
      await fetch(`/todos/${todoId}`, { method: "DELETE" });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
});

// Fetch todos when the page loads
fetchTodos();
