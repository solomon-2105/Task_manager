// src/components/AddTaskForm.js
import React, { useState } from "react";
import "./AddTaskForm.css";

const AddTaskForm = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task.trim()); // ✅ send task to parent
      setTask("");
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
