const input = document.getElementById("inputStudent");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");

let students = [];
console.log(students);

let editIndex = null;

// // localStorage
// let storage = localStorage.getItem("nameStudents")
//   ? JSON.parse(localStorage.getItem("nameStudents"))
//   : [];

const title = document.getElementById("titleUl");

function render() {
  students.forEach((student, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    if (
      (checkbox.onclick = function () {
        li.style.textDecoration = "line-through";
      })
    ) {
    }

    // styling in css
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

btnSubmit.onclick = function () {
  ul.innerHTML = "";
  if (btnSubmit.textContent === "add") {
    if (input.value === "") {
      alert("isi bidang ini!");
    } else {
      students.push({ name: input.value, isEdit: false });
      console.log(students);
      render();
      input.value = "";
    }
  } else if (btnSubmit.textContent == "Save") {
    if (editIndex !== null) {
      onEditClick(editIndex);
      input.value = "";
      btnSubmit.textContent = "add";
      editIndex = null;
    }
  }
};

function onEditClick(index) {
  students[index].name = input.value;
  editIndex = null;
  render();
}
