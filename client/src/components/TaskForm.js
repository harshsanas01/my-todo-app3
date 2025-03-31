// import React, { useState, useEffect } from 'react';

// const TaskForm = ({ addTask, editingTask, updateTask, setEditingTask }) => {
//   const [title, setTitle] = useState('');

//   useEffect(() => {
//     if (editingTask) {
//       setTitle(editingTask.title);
//     }
//   }, [editingTask]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title) return;
//     if (editingTask) {
//       updateTask(editingTask._id, title, editingTask.completed);
//       setEditingTask(null);
//     } else {
//       addTask(title);
//     }
//     setTitle('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         placeholder="Enter task" 
//         value={title} 
//         onChange={(e) => setTitle(e.target.value)} 
//       />
//       <button type="submit">
//         {editingTask ? 'Update Task' : 'Add Task'}
//       </button>
//     </form>
//   );
// };

// export default TaskForm;


import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Save as SaveIcon, Add as AddIcon, Close as CancelIcon } from '@mui/icons-material';

const TaskForm = ({ addTask, editingTask, updateTask, setEditingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCompleted(editingTask.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      updateTask(editingTask._id, title, completed);
    } else {
      addTask(title);
    }
    
    setTitle('');
    setCompleted(false);
  };

  const handleCancel = () => {
    setTitle('');
    setCompleted(false);
    if (setEditingTask) setEditingTask(null);
    if (onCancel) onCancel();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
      <TextField
        autoFocus
        margin="dense"
        id="task-title"
        label="Task Title"
        type="text"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        InputProps={{
          sx: { borderRadius: 2 }
        }}
      />
      
      {editingTask && (
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Mark as completed"
          sx={{ mt: 1, mb: 2 }}
        />
      )}
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={handleCancel}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={editingTask ? 'primary' : 'secondary'}
            disabled={!title.trim()}
            startIcon={editingTask ? <SaveIcon /> : <AddIcon />}
            sx={{ 
              background: editingTask 
                ? 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)' 
                : 'linear-gradient(45deg, #ff4081 30%, #f06292 90%)',
              boxShadow: editingTask
                ? '0 3px 5px 2px rgba(63, 81, 181, .3)'
                : '0 3px 5px 2px rgba(255, 64, 129, .3)',
            }}
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;