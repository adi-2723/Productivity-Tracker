document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  updateProgress();
  updateStreak();
});

function addTask() {
  let taskInput = document.getElementById("taskInput").value;
  let taskDateTime = document.getElementById("taskDateTime").value;
  let priority = document.getElementById("priority").value;
  if (!taskInput) return;

  let task = {
    text: taskInput,
    dateTime: taskDateTime,
    priority: priority,
    completed: false,
  };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";
  loadTasks();
  updateProgress();
}

function loadTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = `${task.text} (${task.priority}) - ${task.dateTime}`;
    li.className = task.completed ? "completed" : "";
    li.onclick = () => toggleTask(index);
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
  updateProgress();
  updateStreak();
}

function updateProgress() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completedTasks = tasks.filter((task) => task.completed).length;
  let progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
  document.getElementById("progressBar").value = progress;
}

function updateStreak() {
  let streak = parseInt(localStorage.getItem("streak")) || 0;
  let today = new Date().toDateString();
  let lastCompletion = localStorage.getItem("lastCompletion");
  if (lastCompletion !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletion", today);
  }
  document.getElementById("streakCount").textContent = streak;
}

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});
if (JSON.parse(localStorage.getItem("darkMode"))) {
  document.body.classList.add("dark-mode");
}
