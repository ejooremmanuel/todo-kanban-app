//For add task button
const showFormBox = document.querySelector(".createTask");
const clickToShow = document.querySelector("#addTask");
const cancel = document.querySelector("#cancel");

cancel.addEventListener("click", () => {
  showFormBox.style.display = "none";
  clickToShow.classList.remove("hideAddTask");
});

clickToShow.addEventListener("click", () => {
  showFormBox.style.display = "block";
  clickToShow.classList.add("hideAddTask");
});

//For file upload
const file = document.querySelector("#file");
const click = document.querySelector("#click");
click.addEventListener("click", () => {
  file.click();
});

//disable and enable submit button

const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
input.addEventListener("input", (e) => {
  if (e.target.value.length > 0) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
});

//Edit task submission
const edit = document.querySelector(".edit");
const form = document.querySelector(".getForm");
const hideEditForm = document.querySelector("#hideForm");
edit.addEventListener("click", () => {
  form.style.display = "flex";
});
hideEditForm.addEventListener("click", () => {
  form.style.display = "none";
});

//For Checkbox
const checkbox = document.querySelector("#checkbox");
const lineThrough = document.querySelector(".checkbox");

lineThrough.addEventListener("click", () => {
  lineThrough.style.textDecoration = "line-through";
});
