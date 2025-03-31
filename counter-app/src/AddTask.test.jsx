import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "../components/AddTask";

test("verifies the form is submitted when valid data is entered", () => {
  const mockAddTask = jest.fn();
  render(<AddTask addTask={mockAddTask} />);

  const input = screen.getByPlaceholderText("Enter task...");
  fireEvent.change(input, { target: { value: "New Task" } });

  const button = screen.getByText("Add Task");
  fireEvent.click(button);

  expect(mockAddTask).toHaveBeenCalledWith("New Task");
});

test("checks if the form clears after submission", () => {
  render(<AddTask addTask={() => {}} />);
  
  const input = screen.getByPlaceholderText("Enter task...");
  fireEvent.change(input, { target: { value: "New Task" } });

  const button = screen.getByText("Add Task");
  fireEvent.click(button);

  expect(input.value).toBe("");
});
