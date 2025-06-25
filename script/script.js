const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

const modalOverlay = document.getElementById("modalOverlay");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const confirmDeleteBtn = document.getElementById("confirmDelete");

let liToDelete = null;

// Function to create a task item with edit and delete buttons
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between px-3 py-2 mb-2 bg-gray-50 rounded shadow-sm border border-gray-200 group transition";

  // Text
  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "break-all";

  // Edit input (hidden by default)
  const input = document.createElement("input");
  input.type = "text";
  input.className =
    "hidden flex-1 p-1 border border-blue-300 rounded text-sm mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  // Right side: Edit & Delete
  const btnGroup = document.createElement("div");
  btnGroup.className = "flex items-center gap-2";

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.title = "Edit";
  editBtn.className =
    "p-1 rounded text-blue-500 hover:text-blue-700 transition";
  editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l-10 10M16.414 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-1.414.586H4v-2a2 2 0 01.586-1.414l10-10z"/></svg>`;

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.title = "Delete";
  deleteBtn.className =
    "p-1 rounded text-red-500 hover:text-red-700 transition";
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`;

  // Edit Logic
  editBtn.addEventListener("click", function () {
    // Show input, hide span
    input.value = span.textContent;
    span.classList.add("hidden");
    input.classList.remove("hidden");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });

  // Save edit on blur or Enter
  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      saveEdit();
    }
    if (e.key === "Escape") {
      input.classList.add("hidden");
      span.classList.remove("hidden");
    }
  });

  function saveEdit() {
    const newVal = input.value.trim();
    if (newVal !== "") {
      span.textContent = newVal;
    }
    input.classList.add("hidden");
    span.classList.remove("hidden");
  }

  // Delete Logic
  deleteBtn.addEventListener("click", function () {
    liToDelete = li;
    modalOverlay.classList.remove("hidden");
  });

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(input);
  li.appendChild(btnGroup);

  return li;
}

// Modal Delete Confirm
cancelDeleteBtn.addEventListener("click", function () {
  modalOverlay.classList.add("hidden");
  liToDelete = null;
});
confirmDeleteBtn.addEventListener("click", function () {
  if (liToDelete) {
    liToDelete.remove();
    liToDelete = null;
  }
  modalOverlay.classList.add("hidden");
});

// Form submit
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task.length === 0) return;
  const li = createTaskElement(task);
  todoList.appendChild(li);
  taskInput.value = "";
});
