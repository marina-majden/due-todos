let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let msg2 = document.getElementById("msg2");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	formValidation();
});

var now = new Date();
const minDate = () => {
	let day = now.getDate();
	let month = now.getMonth() + 1;
	let year = now.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	return `${year}-${month}-${day}`;
}

let formValidation = () => {
	if (textInput.value === "") {
		console.log("failure");
		msg.innerHTML = `<i>This field cannot be blank; please, add a new task.</i>`;
	} else if (dateInput.value < minDate()) {
		console.log("failure");
		msg2.innerHTML = `<i>The due date cannot be in the past.</i>`;	
	}
	else {
		console.log("success");
		msg.innerHTML = "";
		acceptData();
		add.setAttribute("data-bs-dismiss", "modal");
		add.click();
		(() => {
			add.setAttribute("data-bs-dismiss", "");
		})();
	}
};
let data = [];

let acceptData = () => {
	data.push({
		text: textInput.value,
		date: dateInput.value,
		description: textarea.value,
	});

	localStorage.setItem("data", JSON.stringify(data));
	createTasks();
	console.log(data);
};

let createTasks = () => {
	tasks.innerHTML = "";
	data.map((x, y) => {
		return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
	});

	resetForm();
};
let resetForm = () => {
	textInput.value = "";
	dateInput.value = "";
	textarea.value = "";
};

let deleteTask = (e) => {
	e.parentElement.parentElement.remove();

	data.splice(e.parentElement.parentElement.id, 1);

	localStorage.setItem("data", JSON.stringify(data));

	console.log(data);
};

let editTask = (e) => {
	let selectedTask = e.parentElement.parentElement;

	textInput.value = selectedTask.children[0].innerHTML;
	dateInput.value = selectedTask.children[1].innerHTML;
	textarea.value = selectedTask.children[2].innerHTML;

	add.innerHTML = "Save";
};
(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	console.log(data);
	createTasks();
})();
