document.addEventListener("DOMContentLoaded", () => {
  const renderView = (viewName) => {
    fetch(`../views/${viewName}.mustache`)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content").innerHTML = html;
        if (viewName === "home") {
          // Add event listeners, etc., specific to the home view
        } else if (viewName === "todoForm") {
          // Add event listeners, etc., specific to the todo form view
        }
      })
      .catch((error) => console.error("Error fetching view:", error));
  };

  renderView("home"); // Initial rendering
});
