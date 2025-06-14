// src/components/TaskList.js
import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onToggle }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="empty">No tasks to display</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span className="task-title">{task.title}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
