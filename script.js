const input = document.getElementById("inputStudent");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");
const title = document.getElementById("titleUl");

let states = {
  students: JSON.parse(localStorage.getItem("studentName")) || "[]",
  editIndex: null,
};

function saveToLocalStorage() {
  localStorage.setItem("studentName", JSON.stringify(states.students));
}

function createCheckbox(student, index) {
  const checkbox = document.createElement("input");
  checkbox.checked = student.isCompleted;
  checkbox.onclick = function (event) {
    states.students[index].isCompleted = event.target.checked;
    render();
    saveToLocalStorage();
  };
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  return checkbox;
}

function createText(student) {
  const text = document.createElement("p");
  text.textContent = student.name;
  text.style.textDecoration = student.isCompleted ? "line-through" : "none";

  return text;
}

function createButtonDelete(index) {
  const btnDelete = document.createElement("button");
  btnDelete.className = "button__delete";
  btnDelete.textContent = "Delete";

  btnDelete.onclick = function () {
    states.students.splice(index, 1);
    render();
    saveToLocalStorage();
  };

  return btnDelete;
}

function createButtonEdit(index) {
  const btnEdit = document.createElement("button");
  btnEdit.className = "button__edit";
  btnEdit.textContent = "Edit";

  btnEdit.onclick = function () {
    states.editIndex = index;
    render();
    saveToLocalStorage();
  };

  return btnEdit;
}

function renderStudentList() {
  ul.innerHTML = "";
  states.students.forEach((student, index) => {
    const checkbox = createCheckbox(student, index);
    const li = document.createElement("li");

    // styling css
    ul.style.display = "block";
    li.style.display = "flex";

    ul.prepend(title);
    li.append(checkbox);
    li.appendChild(createText(student));
    li.appendChild(createButtonDelete(index));
    li.appendChild(createButtonEdit(index))
    ul.appendChild(li);
    
    // if (!student.isCompleted) {
    //   li.append(createButtonEdit(index));
    // }
  });
}

function EventOnClickButton() {
  if (states.editIndex !== null) {
    btnSubmit.textContent = "save";
    input.focus();
    input.value = states.students[states.editIndex].name;
  } else {
    btnSubmit.textContent = "add";
    input.value = "";
  }

  btnSubmit.onclick = function (event) {
    if (states.editIndex === null) {
      if (input.value === "") {
        alert("isi bidang ini!");
      } else {
        event.preventDefault();
        states.students.push({ name: input.value, isCompleted: false });
        render();
        saveToLocalStorage();
      }
    } else {
      states.students[states.editIndex].name = input.value;
      states.editIndex = null;
      render();
      saveToLocalStorage();
    }
  };
}

function render() {
  renderStudentList();
  EventOnClickButton();
  EventButtonCancel();
}

function EventButtonCancel() {
  btnCancel.onclick = function () {
    input.value = "";
    btnSubmit.textContent = "Add";
    editIndex = null;
  };
}

render();
