import React, { useState, useEffect } from "react";
import { Task } from "../../types/Tasks";
import "../../index.css";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
  onEditTask: (updatedTask: Task) => void;
  editingTask: Task | null;
};

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onEditTask,
  editingTask,
}) => {
  const [formState, setFormState] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });

  useEffect(() => {
    if (editingTask) {
      const { ...rest } = editingTask;
      setFormState(rest);
    }
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.title || !formState.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editingTask) {
      onEditTask({ ...formState, id: editingTask.id });
    } else {
      onAddTask({ ...formState, id: Date.now().toString() });
    }
    setFormState({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "Pending",
    });
  };

  return (
    <form
      className="bg-black border-2 border-white rounded-lg shadow-lg p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-bold text-black mb-1"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="What are you planning?"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 
            placeholder-gray-400 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 
            placeholder-gray-400 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-white mb-1"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            value={formState.dueDate}
            onChange={handleChange}
            type="date"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 
            placeholder-gray-400 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-white mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formState.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 
            placeholder-gray-400 bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-white mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-md 
            focus:border-red-500 focus:ring-1 focus:ring-red-500 
            placeholder-gray-400 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-white text-black font-medium rounded-md
            hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 
            disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        disabled={!formState.title || !formState.dueDate}
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
