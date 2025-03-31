// const express = require('express');
// const serverless = require('serverless-http');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB using environment variable MONGO_URI
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// // Define Mongoose models

// // User Model
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: { type: String, unique: true },
//   password: String
// });
// const User = mongoose.model('User', UserSchema);

// // Task Model
// const TaskSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   title: String,
//   completed: { type: Boolean, default: false }
// });
// const Task = mongoose.model('Task', TaskSchema);

// // JWT authentication middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // API Endpoints

// // User Registration: POST /api/register
// app.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     res.json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: 'User registration failed', details: err });
//   }
// });

// // User Login: POST /api/login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'User not found' });
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(400).json({ error: 'Invalid password' });
//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Login failed', details: err });
//   }
// });

// // Get User’s Tasks: GET /api/tasks
// app.get('/api/tasks', authenticateToken, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// // Add Task: POST /api/tasks
// app.post('/api/tasks', authenticateToken, async (req, res) => {
//   const { title } = req.body;
//   try {
//     const task = new Task({ userId: req.user.id, title });
//     await task.save();
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add task' });
//   }
// });

// // Update Task: PUT /api/tasks/:id
// app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
//   const { title, completed } = req.body;
//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       { title, completed },
//       { new: true }
//     );
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

// // Delete Task: DELETE /api/tasks/:id
// app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete task' });
//   }
// });

// // Export the app as a Netlify Function
// module.exports.handler = serverless(app);
// // If the file is run directly, start the server on port 5001 (or your PORT)
// if (require.main === module) {
//     const port = process.env.PORT || 5001;
//     app.listen(port, () => {
//       console.log(`Backend server running on port ${port}`);
//     });
//   }


const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB using environment variable MONGO_URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Define Mongoose models

// User Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// Task Model
const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Endpoints

// User Registration: POST /api/register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();
    console.log("User registered successfully:", savedUser);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ error: 'User registration failed', details: err });
  }
});

// User Login: POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Login error: User not found for email", email);
      return res.status(400).json({ error: 'User not found' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.error("Login error: Invalid password for user", email);
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("User logged in successfully:", user);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

// Get User’s Tasks: GET /api/tasks
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add Task: POST /api/tasks
app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { title } = req.body;
  try {
    const task = new Task({ userId: req.user.id, title });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// Update Task: PUT /api/tasks/:id
app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { title, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete Task: DELETE /api/tasks/:id
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Export the app as a Netlify Function
module.exports.handler = serverless(app);

// If the file is run directly, start the server on port 5001 (or your PORT)
if (require.main === module) {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}
