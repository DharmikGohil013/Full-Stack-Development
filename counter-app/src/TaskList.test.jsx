import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";

test("renders a list of tasks", () => {
  const tasks = ["Task 1", "Task 2"];
  render(<TaskList tasks={tasks} />);
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test('displays "No tasks available" when the list is empty', () => {
  render(<TaskList tasks={[]} />);
  expect(screen.getByText("No tasks available")).toBeInTheDocument();
});
