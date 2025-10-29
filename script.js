let tasks = [
  { title: "create landing page", date: "20/10/2025", completed: false },
  { title: "create header", date: "20/10/2025", completed: false },
  { title: "create logo", date: "20/10/2025", completed: true },
  { title: "read surat elbakarah", date: "20/10/2025", completed: false },
];

// ✅ تحميل المهام من localStorage عند بداية الصفحة
function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (retrievedTasks != null) {
    tasks = retrievedTasks;
  }
}

getTasksFromStorage();

function fillTasks() {
  document.getElementById("tasks-container").innerHTML = tasks.map((t, index) => `
    <div class="task ${t.completed ? 'done' : ''}">
      <div>
        <h3>${t.title}</h3>
        <div class="due">
          <span class="material-icons">calendar_today</span>
          <span class="due-text">due date: ${t.date}</span>
        </div>
      </div>
      <div id="action">
        <!-- Delete button -->
        <button onclick="deleteTask(${index})" class="circle" style="background-color: red; color: white;">
          <span class="material-icons">delete</span>
        </button>

        <!-- Toggle complete/incomplete -->
        ${t.completed ? `
          <button onclick="completeTask(${index})" class="circle" style="background-color: rgba(244, 102, 102, 1); color: white;">
            <span class="material-icons">cancel</span>
          </button>
        ` : `
          <button onclick="completeTask(${index})" class="circle" style="background-color: rgb(141, 216, 186); color: white;">
            <span class="material-icons">check_circle_outline</span>
          </button>
        `}

        <!-- Edit button -->
        <button onclick="editTask(${index})" class="circle" style="background-color: rgb(124, 195, 224); color: white;">
          <span class="material-icons">edit</span>
        </button>
      </div>
    </div>
  `).join('');
}

fillTasks();

// ✅ إضافة مهمة جديدة
document.getElementById("add-btn").addEventListener("click", () => {
  let proname = prompt("Add title task");
  let now = new Date();
  let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  if (proname) {
    let taskobject = { title: proname, date: date, completed: false };
    tasks.push(taskobject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fillTasks();
  }
});

// ✅ حذف مهمة
function deleteTask(index) {
  let task = tasks[index];
  let isconfirmed = confirm(`Are you sure you want to delete "${task.title}"?`);
  if (isconfirmed) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fillTasks();
  }
}

// ✅ تعديل مهمة
function editTask(index) {
  let task = tasks[index];
  let newTitle = prompt("Edit task title:", task.title);
  if (newTitle) {
    task.title = newTitle;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fillTasks();
  }
}

// ✅ إكمال / إلغاء إكمال المهمة
function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fillTasks();
}
