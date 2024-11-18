// Function to group tasks by priority
export const groupTasksByPriority = (tasks) => {
    const categories = ["Urgent", "High", "Medium", "Low", "No Priority"];
    
    return categories.map((category) => ({
      category,
      tasks: tasks.filter((task) => {
        if (category === "Urgent" && task.priority === 4) return true;
        if (category === "High" && task.priority === 3) return true;
        if (category === "Medium" && task.priority === 2) return true;
        if (category === "Low" && task.priority === 1) return true;
        if (category === "No Priority" && task.priority === 0) return true;
        return false;
      })
    }));
  };
  