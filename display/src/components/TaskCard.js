

// import React from "react";

// const TaskCard = ({ task, users, prioritySymbol, priorityName, statusSymbol, statusName, groupBy }) => {
//   // Find the user associated with this task
//   const user = users.find((u) => u.id === task.userId);

//   // Handle drag start for the task
//   const handleDragStart = (e) => {
//     e.dataTransfer.setData("id", task.id);
//   };

//   // Determine if the task is grouped by 'status' or 'priority' (not by user)
//   const shouldShowProfilePic = groupBy === "status" || groupBy === "priority";

//   return (
//     <div
//       draggable
//       onDragStart={handleDragStart}
//       style={{
//         padding: "12px",
//         margin: "2px 0",
//         borderRadius: "8px",
//         backgroundColor: "#f9f9f9",
//         boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//         cursor: "grab",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
//         {/* Task ID and Title on the Left */}
//         <div>
//           <h4 style={{ margin: "0", fontSize: "16px", color: "#777777" }}>{task.id}</h4>
//           <h5 style={{ margin: "0" }}>{task.title}</h5>
//         </div>

//         {/* Show Profile Picture only if grouped by status or priority */}
//         {shouldShowProfilePic && user && (
//           <img
//             src={"https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"}
//             alt="Profile"
//             style={{
//               width: "25px",
//               height: "25px",
//               borderRadius: "50%",
//               marginTop: "-30px",
//               marginLeft: "8px", // Spacing between task details and profile picture
//             }}
//           />
//         )}
//       </div>

//       {/* Status Section */}
//       <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//         <span style={{ marginRight: "8px", fontSize: "18px" }}>{statusSymbol}</span>
//         <span>{statusName}</span>
//       </div>

//       {/* Priority Section */}
//       <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//         <span style={{ marginRight: "8px", fontSize: "18px" }}>{prioritySymbol}</span>
//         <span>{priorityName}</span>
//       </div>

//       {/* Feature Request Button with Grey Circle on the Left */}
//       <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
//         <button
//           style={{
//             backgroundColor: "#fff",
//             border: "2px solid #ddd",
//             marginTop: "-15px",
//             padding: "5px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "16px",
//             color: "#777777",
//             fontWeight: "bold",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             transition: "background-color 0.3s, color 0.3s",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#f0f0f0";
//             e.target.style.color = "#000";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#fff";
//             e.target.style.color = "#333";
//           }}
//         >
//           {/* Grey Circle on the Left of Button */}
//           <span
//             style={{
//               width: "18px",
//               height: "18px",
//               borderRadius: "50%",
//               backgroundColor: "#ccc", // Grey circle
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "#fff", // Text color inside circle
//               fontSize: "12px",
//               fontWeight: "bold",
//               marginRight: "8px", // Spacing between circle and text
//             }}
//           >
//             ⚪
//           </span>
//           Feature Request
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

import React from "react";
import "./TaskCard.css"; // Import the CSS file

const TaskCard = ({ task, users, prioritySymbol, priorityName, statusSymbol, statusName, groupBy }) => {
  // Find the user associated with this task
  const user = users.find((u) => u.id === task.userId);

  // Handle drag start for the task
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", task.id);
  };

  // Determine if the task is grouped by 'status' or 'priority' (not by user)
  const shouldShowProfilePic = groupBy === "status" || groupBy === "priority";

  return (
    <div className="task-card" draggable onDragStart={handleDragStart}>
      <div className="task-card-header">
        {/* Task ID and Title on the Left */}
        <div>
          <h4 className="task-card-id">{task.id}</h4>
          <h5 className="task-card-title">{task.title}</h5>
        </div>

        {/* Show Profile Picture only if grouped by status or priority */}
        {shouldShowProfilePic && user && (
          <img
            src={"https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"}
            alt="Profile"
            className="profile-pic"
          />
        )}
      </div>

      {/* Status Section */}
      <div className="status-section">
        <span className="status-symbol">{statusSymbol}</span>
        <span>{statusName}</span>
      </div>

      {/* Priority Section */}
      <div className="priority-section">
        <span className="priority-symbol">{prioritySymbol}</span>
        <span>{priorityName}</span>
      </div>

      {/* Feature Request Button with Grey Circle on the Left */}
      <div className="feature-request-button-container">
        <button className="feature-request-button">
          {/* Grey Circle on the Left of Button */}
          <span className="grey-circle">⚪</span>
          Feature Request
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
