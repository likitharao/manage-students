let students = [
    {id:1, name:"John", email:"john@gmail.com", class:"4A"},
    {id:2, name:"Shawn", email:"shawn@gmail.com", class:"1C"},
    {id:3, name:"David", email:"david@gmail.com", class:"2B"},
    {id:4, name:"Peter", email:"peter@gmail.com", class:"3A"},
    {id:5, name:"Chen", email:"chen@gmail.com", class:"4A"}
];

let editId = null;

const studentList = document.getElementById("studentList");
const modal = document.getElementById("studentModal");
const modalTitle = document.getElementById("modalTitle");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const classInput = document.getElementById("classInput");

document.getElementById("addBtn").onclick = () => openModal();
document.getElementById("closeModal").onclick = () => closeModal();
document.getElementById("saveStudent").onclick = saveStudent;

document.getElementById("filterName").onkeyup = renderStudents;
document.getElementById("filterClass").onkeyup = renderStudents;

function openModal(edit=false, student=null) {
    modal.style.display = "block";
    if(edit) {
        modalTitle.innerText = "Edit Student";
        nameInput.value = student.name;
        emailInput.value = student.email;
        classInput.value = student.class;
        editId = student.id;
    } else {
        modalTitle.innerText = "Add Student";
        nameInput.value = "";
        emailInput.value = "";
        classInput.value = "";
        editId = null;
    }
}

function closeModal() {
    modal.style.display = "none";
}

function saveStudent() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const studentClass = classInput.value.trim();

    if(name === "" || email === "" || studentClass === "") return alert("Fill all fields");

    if(editId) {
        students = students.map(s => 
            s.id === editId ? {...s, name, email, class:studentClass} : s
        );
    } else {
        students.push({id: Date.now(), name, email, class:studentClass});
    }

    closeModal();
    renderStudents();
}

function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    renderStudents();
}

function renderStudents() {
    const filterName = document.getElementById("filterName").value.toLowerCase();
    const filterClass = document.getElementById("filterClass").value.toLowerCase();

    studentList.innerHTML = "";

    students
      .filter(s => s.name.toLowerCase().includes(filterName))
      .filter(s => s.class.toLowerCase().includes(filterClass))
      .forEach(student => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <div class="actions">
                <button onclick='openModal(true, ${JSON.stringify(student)})'>Edit</button>
                <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
            </div>
        `;
        studentList.appendChild(div);
      });
}

renderStudents();
