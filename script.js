const input = document.getElementById("inputStudent");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");

// let students = [];
console.log(students);

let editIndex = null;

// localStorage
let storage = JSON.parse(localStorage.getItem("nameStudent")) || [];

// fungsi untuk menyimpan data ke local storage
function saveToLocalStorage() {
  let names = students.map((student) => student.name);
  localStorage.setItem("nameStudent", JSON.stringify(names));
}

// tag h3
const title = document.getElementById("titleUl");

// fungsi untuk menyimpan data
function render() {
  students.forEach((student, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.checked = student.isCompleted || false;
    checkbox.onclick = function () {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
    };

    li.style.textDecoration ? student.isCompleted : "line-through" || "none";

    // styling css
    ul.style.display = "block";
    li.style.display = "flex";
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";

    const btnDelete = document.createElement("button");
    btnDelete.className = "button__delete";
    btnDelete.textContent = "Delete";
    btnDelete.remove;

    btnDelete.onclick = function () {
      li.remove(index);
      students.splice(index, 1);
      saveToLocalStorage();
      console.log(students);
    };

    const btnEdit = document.createElement("button");
    btnEdit.className = "button__edit";
    btnEdit.textContent = "Edit";

    btnEdit.onclick = function () {
      btnSubmit.textContent = "Save";
      input.focus();
      input.value = student.name;
      editIndex = index;
      students.map((student) => (student.isEdit = true));
      console.table(students);
    };

    // append element
    ul.prepend(title);
    ul.appendChild(li);
    li.appendChild(checkbox);
    li.append(document.createTextNode(student.name));
    li.append(btnDelete);
    li.append(btnEdit);
  });
}

// event handler button submit 2 fungsi
btnSubmit.onclick = function () {
  ul.innerHTML = "";
  if (btnSubmit.textContent === "add") {
    if (input.value === "") {
      alert("isi bidang ini!");
    } else {
      students.push({ name: input.value, isEdit: false, isCompleted: false });
      console.log(students);
      render();
      saveToLocalStorage();
      input.value = "";
    }
  } else if (btnSubmit.textContent == "Save") {
    if (editIndex !== null) {
      onEditClick(editIndex);
      input.value = "";
      btnSubmit.textContent = "add";
      saveToLocalStorage();
      editIndex = null;
    }
  }
};

// fungsi untuk tombol cancel
btnCancel.onclick = function () {
  input.value = "";
  btnSubmit.textContent = "Add";
  editIndex = null;
};

// fungsi untuk perubahan edit
function onEditClick(index) {
  students[index].name = input.value;
  editIndex = null;
  render();
}
