let input       = document.querySelector("#input");
let btn         = document.querySelector("#btn");
let unOrderList = document.querySelector("#unOrderList");
let emptyState  = document.querySelector("#emptyState");
let taskCount   = document.querySelector("#taskCount");

// ── Update task count & empty state ──
function updateCount() {
    let count = unOrderList.querySelectorAll(".list").length;
    taskCount.textContent = count;
    emptyState.style.display = count === 0 ? "block" : "none";
}

// ── Create and add a new task ──
function uiLogic() {

    // List Item
    let list = document.createElement("li");
    list.classList.add("list");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    // Task Text
    let text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = input.value.trim();

    // Edit Button (custom image)
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.title = "Edit Task";
    editBtn.addEventListener("click", function () {
        let edited = prompt("Edit Task:", text.textContent);
        if (edited !== null && edited.trim() !== "") {
            text.textContent = edited.trim();
        }
    });

    // Delete Button (custom image)
    let delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.title = "Delete Task";
    delBtn.addEventListener("click", function () {
        list.style.transform  = "scale(0.9)";
        list.style.opacity    = "0";
        list.style.transition = "all 0.2s ease";
        setTimeout(function () {
            list.remove();
            updateCount();
        }, 200);
    });

    // Checkbox toggle
    checkbox.addEventListener("change", function () {
        text.classList.toggle("completed", this.checked);
    });

    // Assemble
    let textCheckbox = document.createElement("div");
    textCheckbox.classList.add("text-checkbox");
    textCheckbox.append(checkbox, text);

    let editDelete = document.createElement("div");
    editDelete.classList.add("edit-delete");
    editDelete.append(editBtn, delBtn);

    list.append(textCheckbox, editDelete);
    unOrderList.appendChild(list);

    input.value = "";
    updateCount();
}

// ── Button click ──
btn.addEventListener("click", function () {
    if (input.value.trim() !== "") {
        uiLogic();
    }
});

// ── Enter key ──
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && input.value.trim() !== "") {
        uiLogic();
    }
});

// ── Init ──
updateCount();
