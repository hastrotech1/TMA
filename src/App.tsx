// import React from "react";
// import TaskList from "./components/TaskList/TaskList";
// import { Task } from "./types/Tasks";
// import TaskForm from "./components/TaskForm/TaskForm";
// import "./index.css";
// import { useState } from "react";

// const App: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   const saveTasks = (newTasks: Task[]) => {
//     setTasks(newTasks);
//     localStorage.setItem("tasks", JSON.stringify(newTasks));
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//   };

//   const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
//     saveTasks(
//       tasks.map((task) =>
//         task.id === taskId ? { ...task, ...updatedTask } : task
//       )
//     );
//     setEditingTask(null);
//   };

//   const handleAddTask = (task: Task) => {
//     setTasks((prevTasks) => [...prevTasks, task]);
//   };

//   const handleDeleteTask = (taskId: string) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         <TaskForm
//           onAddTask={handleAddTask}
//           onEditTask={handleEditTask}
//           editingTask={editingTask}
//         />
//         <TaskList
//           tasks={tasks}
//           onAddTask={handleAddTask}
//           onUpdateTask={handleUpdateTask}
//           onDeleteTask={handleDeleteTask}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import { Task } from "./types/Tasks";
import TaskForm from "./components/TaskForm/TaskForm";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEditTask = (updatedTask: Task) => {
    // Update the task and save
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(newTasks);
    setEditingTask(null);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
  };

  const handleAddTask = (task: Task) => {
    saveTasks([...tasks, task]); // Use saveTasks to persist to localStorage
  };

  const handleDeleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId)); // Use saveTasks here too
  };

  // const handleStartEdit = (task: Task) => {
  //   setEditingTask(task);
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
          // onStartEdit={handleStartEdit}
        />
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
