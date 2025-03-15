// Confirm task deletion
function confirmDelete(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        window.location.href = `/delete/${taskId}`;
    }
}

// Add animation when a task is added or updated
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle form submission for adding/updating tasks
document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const action = form.getAttribute("action");
            const method = form.getAttribute("method");

            fetch(action, {
                method: method,
                body: formData,
            })
                .then((response) => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    if (data && data.error) {
                        showNotification(data.error, "error");
                    }
                })
                .catch((error) => {
                    showNotification("There was an error processing your request.", "error");
                });
        });
    });
});