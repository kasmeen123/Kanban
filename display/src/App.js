
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import './App.css'; // Importing the CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("status"); // Default filter is "status"
  const [currentlyHoveringOver, setCurrentlyHoveringOver] = useState(null);

  // Fetch data from the given API
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    setFilter(e.target.value);
  };

  // Group tasks based on the selected filter (status, priority, or user)
  const groupTasks = (tasks, filter) => {
    if (filter === "status") {
      const statuses = ["Todo", "In Progress", "Done", "Backlog"];
      return statuses.map((status) => ({
        status,
        tasks: tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase()),
      }));
    } else if (filter === "priority") {
      const priorityLevels = [0, 1, 2, 3, 4]; // Priority levels from highest to lowest
      return priorityLevels.map((priority) => ({
        priority: getPriorityLabel(priority),
        tasks: tasks
          .filter((task) => task.priority === priority)
          .sort((a, b) => a.title.localeCompare(b.title)),
      }));
    } else if (filter === "user") {
      return users.map((user) => ({
        user,
        tasks: tasks.filter((task) => task.userId === user.id),
      }));
    }
  };

  const columns = groupTasks(tasks, filter);

  // Handle drag and drop
  const handleDrop = (e, status) => {
    e.preventDefault();
    setCurrentlyHoveringOver(null);
    const id = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, status } : t
        )
      );
    }
  };

  const handleDragEnter = (status) => {
    setCurrentlyHoveringOver(status);
  };

  // Symbol based on task status
  const getStatusSymbol = (status) => {
    switch (status) {
      case "Todo":
        return "📝"; // Pencil for Todo
      case "In Progress":
        return "⏳"; // Hourglass for In Progress
      case "Done":
        return "✅"; // Checkmark for Done
      case "Backlog":
        return "📋"; // Cross mark for Cancelled
      default:
        return "";
    }
  };

  // Symbol based on task priority
  const getPrioritySymbol = (priority) => {
    switch (priority) {
      case "Urgent":
        return "🔴"; // Urgent - Red Circle
      case "High":
        return "🟠"; // High - Orange Circle
      case "Medium":
        return "🟡"; // Medium - Yellow Circle
      case "Low":
        return "🟢"; // Low - Green Circle
      case "No Priority":
        return "⚪"; // No Priority - White Circle
      default:
        return "";
    }
  };

  return (
    <div className="container">
      {/* Dropdown for filter with symbol */}
      <div className="filter-container">
        <select
          value={filter}
          onChange={handleDropdownChange}
          className="select-dropdown"
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Display tasks based on selected filter */}
      <div className="columns-container">
        {columns.map((column) => (
          <div
            key={column.user?.id || column.status || column.priority}
            onDrop={(e) => handleDrop(e, column.status || column.priority)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(column.status || column.priority || column.user?.name)}
            className="column"
          >
            {/* Column Header */}
            <div className="column-header">
              <h3>
                <span>
                  {filter === "status" ? getStatusSymbol(column.status) :
                    filter === "priority" ? getPrioritySymbol(column.priority) :
                    filter === "user" ? <img src="https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180" alt="user" className="user-avatar" /> : ""}
                </span>
                {filter === "status" ? column.status :
                  filter === "priority" ? column.priority :
                  filter === "user" ? column.user.name :
                  ""}
                ({column.tasks.length})
              </h3>

              {/* Button Container */}
              <button className="add-button">+</button>

              {/* Ellipsis Symbol outside the button */}
              <span className="ellipsis">...</span>
            </div>

            {/* Task Cards */}
            <div className="task-cards">
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  groupBy={filter}  // Pass the current filter as groupBy
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// Function to get the priority label
const getPriorityLabel = (priority) => {
  switch (priority) {
    case 0:
      return "Urgent";
    case 1:
      return "High";
    case 2:
      return "Medium";
    case 3:
      return "Low";
    case 4:
      return "No Priority";
    default:
      return "Unknown";
  }
};
export default App;
