// Simple To-do List with edit/delete and modal confirmation

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const modalOverlay = document.getElementById("modalOverlay");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

let tasks = [];
let taskToDelete = null;
let isEditMode = false;
let editTaskIndex = null;

// Helpers to create button with icon
function createIconButton(btnClass, iconPath, alt, text) {
  const btn = document.createElement("button");
  btn.className = btnClass;
  btn.type = "button";
  const img = document.createElement("img");
  img.src = iconPath;
  img.alt = alt;
  img.width = 18;
  img.height = 18;
  btn.appendChild(img);
  btn.appendChild(document.createTextNode(text));
  return btn;
}

// Render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (task.editing) {
      // Editing mode: show input + save/cancel
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "task-input";
      li.appendChild(input);

      // Save button
      const saveBtn = createIconButton(
        "edit-btn",
        "./components/icons8-edit-32.png",
        "Save",
        "Save"
      );
      saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (newText !== "") {
          tasks[i].text = newText;
          tasks[i].editing = false;
          renderTasks();
        }
      };
      li.appendChild(saveBtn);

      // Cancel button
      const cancelBtn = createIconButton(
        "cancel-btn",
        "./components/icons8-edit-32.png",
        "Cancel",
        "Cancel"
      );
      cancelBtn.onclick = () => {
        tasks[i].editing = false;
        renderTasks();
      };
      li.appendChild(cancelBtn);
    } else {
      // Normal mode
      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = task.text;
      li.appendChild(span);

      // Edit button
      const editBtn = createIconButton(
        "edit-btn",
        "./components/icons8-edit-32.png",
        "Edit",
        "Edit"
      );
      editBtn.onclick = () => {
        tasks[i].editing = true;
        renderTasks();
      };
      li.appendChild(editBtn);

      // Delete button
      const deleteBtn = createIconButton(
        "delete-btn",
        "./components/icons8-trash.svg",
        "Delete",
        "Delete"
      );
      deleteBtn.onclick = () => {
        taskToDelete = i;
        modalOverlay.classList.remove("hidden");
      };
      li.appendChild(deleteBtn);
    }

    todoList.appendChild(li);
  });
}

// Add task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (value !== "") {
    tasks.push({ text: value });
    taskInput.value = "";
    renderTasks();
  }
});

// Modal Delete
confirmDeleteBtn.addEventListener("click", function () {
  if (taskToDelete !== null) {
    tasks.splice(taskToDelete, 1);
    taskToDelete = null;
    modalOverlay.classList.add("hidden");
    renderTasks();
  }
});
cancelDeleteBtn.addEventListener("click", function () {
  taskToDelete = null;
  modalOverlay.classList.add("hidden");
});

// Optional: close modal if click outside modal
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.add("hidden");
    taskToDelete = null;
  }
});

// Initial render
renderTasks();
