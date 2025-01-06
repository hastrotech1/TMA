import React, { useState } from "react";
import TaskList from "./TaskList/TaskList";
import { Task } from "../types/Tasks";

const ParentComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to delete a task
  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to add a new task
  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Function to update a task
  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <TaskList
      tasks={tasks}
      onDeleteTask={handleDeleteTask}
      onAddTask={handleAddTask}
      onUpdateTask={handleUpdateTask}
    />
  );
};

export default ParentComponent;
