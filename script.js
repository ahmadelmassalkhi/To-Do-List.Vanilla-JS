const list = document.querySelector(".todo-list");
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const filter = document.querySelector(".filter");

document.addEventListener("DOMContentLoaded", createSavedTodos);
document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelector(".fancy");
  const content = text.textContent;

  let letters = content.split("");
  const length = letters.length;
  text.textContent = "";

  for (let i = 0; i < length; i++) {
    text.innerHTML += "<span>" + letters[i] + "</span>";
  }
  const spans = text.querySelectorAll("span");
  let char = 0;
  let timer = null;

  function clock1() {
    char = 0;
    timer = setInterval(addClass, 50);
  }
  function addClass() {
    let spanC = spans[char];
    spanC.classList.add("fade");
    let ms = length * 50 + 50;
    setTimeout(() => {
      char = 0;
      spanC.classList.add("color");
    }, ms);
    char++;
    if (char == length) {
      clearInterval(timer);
      timer = null;
    }
  }
  clock1();
});

submitBtn.addEventListener("click", addToDo);
list.addEventListener("click", deleteCheck);
filter.addEventListener("click", todoFilter);

function createElement(value) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const completeBtn = document.createElement("button");
  const trashBtn = document.createElement("button");

  list.appendChild(div);
  div.appendChild(li);
  div.appendChild(completeBtn);
  div.appendChild(trashBtn);

  div.classList.add("todo-div");
  li.classList.add("todo-li");
  trashBtn.classList.add("trash-btn");
  completeBtn.classList.add("complete-btn");

  completeBtn.innerHTML = "<i class='fas fa-check'></i>";
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
  li.innerText = value;
}

function addToDo(e) {
  e.preventDefault();
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  if (!todos.includes(input.value) && input.value !== "") {
    createElement(input.value);
    saveLocalTodos(input.value);
  }

  input.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  const parent = item.parentElement;
  const stringName = parent.children[0].innerText;

  let checkedList;
  if (localStorage.getItem("checkedList") === null) {
    checkedList = [];
  } else {
    checkedList = JSON.parse(localStorage.getItem("checkedList"));
  }

  if (item.classList.contains("trash-btn")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(todos.indexOf(parent.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    checkedList.splice(checkedList.indexOf(parent.children[0].innerText), 1);
    localStorage.setItem("checkedList", JSON.stringify(checkedList));

    parent.classList.add("fall");
    parent.addEventListener("transitionend", () => {
      parent.remove();
    });
  } else if (item.classList.contains("complete-btn")) {
    
    if (parent.classList.contains("completed")) {
      checkedList.splice(checkedList.indexOf(stringName), 1);
    } else {
      checkedList.push(stringName);
    }
    localStorage.setItem("checkedList", JSON.stringify(checkedList));

    parent.classList.toggle("completed");
  }
}

function todoFilter(e) {
  const todos = list.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
      case "Uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createSavedTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(function (todo) {
      createElement(todo);
    });

    let checkedList;

    if (localStorage.getItem("checkedList") === null) {
      checkedList = [];
    } else {
      checkedList = JSON.parse(localStorage.getItem("checkedList"));

      list.childNodes.forEach(function (div) {
        const name = div.children[0].innerText;
        if (checkedList.includes(name)) {
          div.classList.add("completed");
        }
      });
    }
  }
}

