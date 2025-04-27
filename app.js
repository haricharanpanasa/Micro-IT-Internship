let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
  }
};

const updateTasksList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <!-- Edit icon (white color) -->
          <img src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" style="filter: brightness(0) invert(1);" alt="Edit" onclick="editTask(${index})" />
          <!-- Delete bin icon (red color) -->
          <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" style="filter: brightness(0) saturate(100%) hue-rotate(0deg) invert(22%) sepia(94%) saturate(7494%) hue-rotate(-4deg) brightness(97%) contrast(117%);" alt="Delete" onclick="deleteTask(${index})" />
        </div>
      </div>
    `;

    listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });

  updateProgress();
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
};

const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTasksList();
  }
};

const updateProgress = () => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const numbers = document.getElementById("numbers");
  const progress = document.getElementById("progress");

  numbers.innerText = `${completedTasks} / ${totalTasks}`;
  if (totalTasks === 0) {
    progress.style.width = "0%";
  } else {
    progress.style.width = `${(completedTasks / totalTasks) * 100}%`;
  }

  if (completedTasks > 0 && completedTasks === totalTasks) {
    runConfetti();
  }
};

const runConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});






