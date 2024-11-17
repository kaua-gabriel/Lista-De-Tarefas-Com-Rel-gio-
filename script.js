// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Adicionar nova tarefa
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      createTaskElement(taskText);
      taskInput.value = "";
    }
  });
  
  // Função para atualizar o relógio
function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualizar o relógio a cada segundo
setInterval(updateClock, 1000);

// Inicializar o relógio ao carregar a página
updateClock();

  // Criar elemento de tarefa
  function createTaskElement(text) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
      <span>${text}</span>
      <button class="delete-btn">×</button>
    `;

    // Marcar como concluída
    li.addEventListener("click", (e) => {
      if (!e.target.classList.contains("delete-btn")) {
        li.classList.toggle("completed");
      }
    });

    // Remover tarefa
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.style.transform = "scale(0)";
      li.style.opacity = "0";
      setTimeout(() => li.remove(), 300);
    });

    taskList.appendChild(li);
  }

  // Filtrar tarefas
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterTasks(btn.dataset.filter);
    });
  });

  function filterTasks(filter) {
    const tasks = taskList.querySelectorAll(".task-item");
    tasks.forEach((task) => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "pending":
          task.style.display = task.classList.contains("completed")
            ? "none"
            : "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed")
            ? "flex"
            : "none";
          break;
      }
    });
  }
});