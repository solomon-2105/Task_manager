const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware

// Default route
app.get('/', (req, res) => {
  res.send('Task Manager Backend is Running!');
});

// ✅ POST /tasks route
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, false]
    );
    res.json(newTask.rows[0]); // ✅ This must be rows[0]
  } catch (err) {
    console.error(err.message);
  }
});


// ✅ GET /tasks - fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching tasks');
  }
});


// ✅ DELETE /tasks/:id - delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error deleting task');
  }
});

// Update task (e.g., toggle completion)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updateTask = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );

    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating task');
  }
});


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
