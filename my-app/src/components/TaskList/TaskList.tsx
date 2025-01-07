import React, { useState } from "react";
import { Task } from "../../types/Tasks";
import TaskForm from "../TaskForm/TaskForm";
import "../../index.css";

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
    <div className="space-y-6">
      <div className="bg-black border-2 border-white rounded-lg p-6">
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        />
        <h2 className="text-2xl font-semibold text-white mt-4 mb-6">
          Task List
        </h2>
        <div className="text-2xl font-bold text-black mb-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              aria-label="Filter tasks by priority"
              onChange={(e) =>
                setFilters((f) => ({ ...f, priority: e.target.value }))
              }
              className="px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="\">All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 
              hover:border-black transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-black">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600">Due:</span>
                  <span className="ml-2 font-medium text-black">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">Priority:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium
                    ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium
                    ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartEditing(task)}
                    className="px-3 py-1 text-sm bg-black text-white rounded 
                    hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded 
                    hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Create a new task to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
