import React, { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import { Task } from "./types/Tasks";
// import TaskForm from "./components/TaskForm/TaskForm";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  // const [editingTask, setEditingTask] = useState<Task | null>(null);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEditTask = (taskId: string, updatedTask: Partial<Task>) => {
    // Update the task and save
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    saveTasks(newTasks);
    // setEditingTask(null);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    // setEditingTask(null);
  };

  const handleAddTask = (task: Task) => {
    saveTasks([...tasks, task]); // Use saveTasks to persist to localStorage
  };

  const handleDeleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId)); // Use saveTasks here too
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Content wrapper */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Header section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Task Manager</h1>
          <p className="text-gray-500 mb-8">Organize your tasks efficiently</p>
        </header>
        {/* <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        /> */}
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default App;
