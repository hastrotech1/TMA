import React, { useState } from "react";
import { Task } from "../../types/Tasks";
import TaskForm from "../TaskForm/TaskForm";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;

  onAddTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks: initialTasks,
  onUpdateTask,
  onDeleteTask,
  onAddTask,
}) => {
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    onAddTask(task);
  };

  const handleEditTask = (updatedTask: Task) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
    onUpdateTask(updatedTask.id, updatedTask);
    setEditingTask(null); // Exit edit mode
  };

  const handleRemoveTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    onDeleteTask(taskId);
  };

  const handleStartEditing = (task: Task) => {
    setEditingTask(task);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.status || task.status === filters.status)
  );

  return (
    <div>
      <TaskForm
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        editingTask={editingTask}
      />
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <div className="flex gap-4 mb-4">
        <select
          aria-label="Filter tasks by priority"
          onChange={(e) =>
            setFilters((f) => ({ ...f, priority: e.target.value }))
          }
          className="p-2 border rounded-lg"
        >
          <option value="\">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          aria-label="Filter tasks by status"
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
          className="p-2 border rounded-lg"
        >
          <option value="\">All Statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleStartEditing(task)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
              <button
                onClick={() => onUpdateTask(task.id, { status: "Completed" })}
              >
                Mark as Completed
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
