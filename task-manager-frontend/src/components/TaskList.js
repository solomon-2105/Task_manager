// src/components/TaskList.js
import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="empty">No tasks to display</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.title}</span>
          <button className="delete-button" onClick={() => onDelete(task.id)}>
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
