const input = document.getElementById("inputStudent");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");

let index = null;
let isEdit = false;

// localStorage
let storage = localStorage.getItem("nameStudents")
  ? JSON.parse(localStorage.getItem("nameStudents"))
  : [];

console.log(localStorage);

function render() {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");

  // take value input
  const valueInput = input.value;

  const textSpan = document.createElement("span");
  localStorage.setItem("nameStudents", JSON.stringify(valueInput));
  textSpan.textContent = valueInput;
  textSpan.className = "textSpan";

  // styling in css
  ul.style.display = "block";
  li.style.display = "flex";
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  const btnDelete = document.createElement("btnAdd");
  btnDelete.className = "button__delete";
  btnDelete.textContent = "Delete";
  btnDelete.remove;

  btnDelete.onclick = function () {
    li.remove();
  };

  const btnEdit = document.createElement("button");
  btnEdit.className = "button__edit";
  btnEdit.textContent = "Edit";

  btnEdit.onclick = function () {
    btnAdd.textContent = "Save";
    input.focus();
    index = textSpan;
    input.value = textSpan.textContent;
    isEdit = true;
  };

  // append element
  ul.appendChild(li);
  li.appendChild(checkbox);
  li.append(btnDelete);
  li.append(btnEdit);
  li.append(textSpan);
}

btnAdd.onclick = function () {
  if (btnAdd.textContent === "add") {
    if (input.value === "") {
      alert("isi bidang ini!");
    } else {
      localStorage.setItem("nameStudents", JSON.stringify(storage));
      render(index);
      input.value = "";
    }
  } else if (btnAdd.textContent === "Save") {
    if (index) {
      onEditClick(index);
      input.value = "";
    }
  }
};

function onEditClick() {
  index.textContent = input.value;
}
