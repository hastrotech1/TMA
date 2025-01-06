import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import { Task } from "../../types/Tasks";
import "@testing-library/jest-dom";

const sampleTasks: Task[] = [
  {
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  },
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  },
  {
    id: "2",
    title: "Task 2",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "In Progress",
  },
];

const mockOnDeleteTask = jest.fn();
const mockOnUpdateTask = jest.fn();
const mockOnAddTask = jest.fn();

describe("TaskList", () => {
  it("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={sampleTasks}
        onUpdateTask={jest.fn()}
        onDeleteTask={(taskId) =>
          sampleTasks.filter((task) => task.id !== taskId)
        }
        onAddTask={jest.fn()}
      />
    );
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();

    const taskItems = screen.getAllByRole("heading", { level: 3 });
    expect(taskItems).toHaveLength(sampleTasks.length);

    expect(taskItems[0]).toHaveTextContent("Task 1");
    expect(taskItems[1]).toHaveTextContent("Task 2");
  });

  it("deletes a task after confirmation", () => {
    const mockDeleteTask = jest.fn();
    render(
      <TaskList
        tasks={sampleTasks}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={jest.fn()}
        onAddTask={jest.fn()}
      />
    );

    // Click the delete button for the first task
    const deleteButtons = screen.getAllByText(/delete task/i);
    expect(deleteButtons).toHaveLength(sampleTasks.length);

    fireEvent.click(deleteButtons[0]);

    // Simulate confirmation
    const confirmButton = screen.getByText(/yes/i);
    fireEvent.click(confirmButton);

    // Ensure the delete function is called with the correct task ID
    expect(mockDeleteTask).toHaveBeenCalledWith("1");
    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
  });

  test("renders TaskList component", () => {
    const { getByText } = render(
      <TaskList
        tasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onUpdateTask={mockOnUpdateTask}
        onAddTask={mockOnAddTask}
      />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });

  it("updates a task with new values", async () => {
    const mockUpdateTask = jest.fn();
    render(
      <TaskList
        tasks={sampleTasks}
        onDeleteTask={jest.fn()}
        onUpdateTask={mockUpdateTask}
        onAddTask={jest.fn()}
      />
    );

    // Click the edit button for the first task
    const editButtons = screen.getAllByText(/edit task/i);
    expect(editButtons).toHaveLength(sampleTasks.length);

    fireEvent.click(editButtons[0]);

    // Fill the edit form with new values
    const titleInput = screen.getByPlaceholderText(/title/i);
    fireEvent.change(titleInput, { target: { value: "Updated Task 1" } });

    const descriptionInput = screen.getByPlaceholderText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description 1" },
    });

    const prioritySelect = screen.getByPlaceholderText(/select priority/i);
    fireEvent.change(prioritySelect, { target: { value: "Medium" } });

    const statusSelect = screen.getByPlaceholderText(/select status/i);
    fireEvent.change(statusSelect, { target: { value: "In Progress" } });

    // Click save to update the task
    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    // Wait for the update function to be called
    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith("1", {
        title: "Updated Task 1",
        description: "Updated Description 1",
        priority: "Medium",
        status: "In Progress",
      });
      expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    });
  });
});
