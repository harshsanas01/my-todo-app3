

// css1 works 100 percent without sort

import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Fab,
  CssBaseline,
  ThemeProvider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Divider,
  InputBase,
  createTheme,
  alpha,
  Zoom,
  Card,
  CardContent,
  Grid,
  SwipeableDrawer,
  Skeleton,
  Stack,
  Badge,
  Tabs,
  Tab,
  useTheme,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExitToApp as LogoutIcon,
  Add as AddIcon,
  Check as DoneIcon,
  FilterList as FilterListIcon,
  Home as HomeIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ListAlt as ListIcon,
  FormatListBulleted as CategoryIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Palette as PaletteIcon,
  NotificationsNone as NotificationIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Sort as SortIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  Flag as FlagIcon,
  AccessTime as ClockIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

// Create light and dark theme options
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#9d46ff' : '#6200ea',
      light: '#b76aff',
      dark: mode === 'dark' ? '#6200ea' : '#4a00b0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff3d00',
      light: '#ff7539',
      dark: '#c30000',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f7fb',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#e0e0e0' : '#333333',
      secondary: mode === 'dark' ? '#a0a0a0' : '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.25)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
        containedPrimary: {
          background: mode === 'dark' 
            ? 'linear-gradient(45deg, #6200ea 30%, #b388ff 90%)' 
            : 'linear-gradient(45deg, #6200ea 30%, #9d46ff 90%)',
          boxShadow: '0 4px 12px rgba(98, 0, 234, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 14px rgba(98, 0, 234, 0.4)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginBottom: 12,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px rgba(98, 0, 234, 0.3)',
        },
        primary: {
          background: 'linear-gradient(45deg, #6200ea 30%, #9d46ff 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'dark' 
            ? '0 8px 24px rgba(0, 0, 0, 0.2)' 
            : '0 8px 24px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark' 
              ? '0 12px 28px rgba(0, 0, 0, 0.3)' 
              : '0 12px 28px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Task priority colors
const priorityColors = {
  high: "#f44336",
  medium: "#ff9800",
  low: "#4caf50",
  none: "#9e9e9e"
};

// Get a random gradient for task backgrounds
const getRandomGradient = (darkMode) => {
  const gradients = darkMode ? [
    'linear-gradient(135deg, #1e1e1e 10%, #2a2a2a 90%)',
    'linear-gradient(135deg, #1c1c1c 10%, #2d2d2d 90%)',
    'linear-gradient(135deg, #1a1a1a 10%, #303030 90%)',
    'linear-gradient(135deg, #1d1d1d 10%, #323232 90%)',
    'linear-gradient(135deg, #202020 10%, #2c2c2c 90%)',
  ] : [
    'linear-gradient(135deg, #FF9D6C 10%, #BB4E75 90%)',
    'linear-gradient(135deg, #FFD3A5 10%, #FD6585 90%)',
    'linear-gradient(135deg, #5EE7DF 10%, #B490CA 90%)',
    'linear-gradient(135deg, #C2E9FB 10%, #A1C4FD 90%)',
    'linear-gradient(135deg, #FCCF31 10%, #F55555 90%)',
    'linear-gradient(135deg, #F761A1 10%, #8C1BAB 90%)',
    'linear-gradient(135deg, #43CBFF 10%, #9708CC 90%)',
    'linear-gradient(135deg, #667EEA 10%, #764BA2 90%)',
    'linear-gradient(135deg, #ABDCFF 10%, #0396FF 90%)',
    'linear-gradient(135deg, #FEB692 10%, #EA5455 90%)',
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Task form component
const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'none');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      dueDate,
      completed: initialTask?.completed || false,
      id: initialTask?._id
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        autoFocus
        margin="dense"
        label="Task Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<DoneIcon />}>
          {initialTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>
    </Box>
  );
};

// Main TodoList component
const TodoList = () => {
  const { token, logout, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, taskId: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [viewType, setViewType] = useState('card'); // 'card' or 'list'

  const navigate = useNavigate();
  const themeObject = getTheme(darkMode ? 'dark' : 'light');
  const isMobile = useMediaQuery(themeObject.breakpoints.down('sm'));
  const isTablet = useMediaQuery(themeObject.breakpoints.between('sm', 'md'));

  // Tab labels corresponding to filter values
  const tabLabels = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ];

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.map(task => ({
        ...task,
        bgGradient: getRandomGradient(darkMode),
      })));
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: 'Failed to fetch tasks',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, darkMode]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [token, navigate, fetchTasks]);

  // Update tasks background when dark mode changes
  useEffect(() => {
    if (tasks.length > 0) {
      setTasks(tasks.map(task => ({
        ...task,
        bgGradient: getRandomGradient(darkMode),
      })));
    }
  }, [darkMode]);

  // Add task
  const addTask = async (taskData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tasks`,
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newTask = {
        ...res.data,
        bgGradient: getRandomGradient(darkMode),
      };
      setTasks([...tasks, newTask]);
      setNotification({
        open: true,
        message: 'Task added successfully',
        severity: 'success',
      });
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: 'Failed to add task',
        severity: 'error',
      });
    }
  };

  // Update task
  const updateTask = async (taskData) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${taskData.id}`,
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTasks(tasks.map((task) => 
        task._id === taskData.id ? { ...res.data, bgGradient: task.bgGradient } : task
      ));
      
      setNotification({
        open: true,
        message: 'Task updated successfully',
        severity: 'success',
      });
      setEditingTask(null);
      setFormOpen(false);
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: 'Failed to update task',
        severity: 'error',
      });
    }
  };

  // Toggle task completion
  const toggleComplete = async (id, completed) => {
    try {
      const task = tasks.find(t => t._id === id);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${id}`,
        { ...task, completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTasks(tasks.map((task) => 
        task._id === id ? { ...task, completed: !completed } : task
      ));
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: 'Failed to update task',
        severity: 'error',
      });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      setNotification({
        open: true,
        message: 'Task deleted successfully',
        severity: 'success',
      });
      setConfirmDelete({ open: false, taskId: null });
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: 'Failed to delete task',
        severity: 'error',
      });
    }
  };

  // Open task edit form
  const handleEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Apply filter
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => {
      // Apply search
      if (!searchQuery) return true;
      return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
          return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFilter(tabLabels[newValue].value);
  };
  
  // Handle sort menu
  const handleSortOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  
  const handleSort = (sortType) => {
    setSortBy(sortType);
    setSortAnchorEl(null);
  };
  
  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const toggleDrawer = (open) => () => {
    setMobileDrawerOpen(open);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Get status chip color
  const getStatusColor = (task) => {
    if (task.completed) return 'success';
    if (task.dueDate) {
      const daysRemaining = getDaysRemaining(task.dueDate);
      if (daysRemaining < 0) return 'error';
      if (daysRemaining < 3) return 'warning';
    }
    return 'info';
  };
  
  // Get status text
  const getStatusText = (task) => {
    if (task.completed) return 'Completed';
    if (task.dueDate) {
      const daysRemaining = getDaysRemaining(task.dueDate);
      if (daysRemaining < 0) return 'Overdue';
      if (daysRemaining === 0) return 'Due today';
      if (daysRemaining === 1) return 'Due tomorrow';
      return `${daysRemaining} days left`;
    }
    return 'In progress';
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar
          src={user?.avatar || ''}
          alt={user?.name || 'User'}
          sx={{ width: 64, height: 64 }}
        />
      </Box>
      <Typography variant="h6" align="center" sx={{ mb: 3 }}>
        {user?.name || 'User'}
      </Typography>
      <Divider />
      <List>
        <ListItemButton selected>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Important" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="primary"
            />
          }
          label="Dark Mode"
        />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={themeObject}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              TaskMaster
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '50px',
                  backgroundColor: alpha(themeObject.palette.common.black, 0.05),
                  '&:hover': {
                    backgroundColor: alpha(themeObject.palette.common.black, 0.1),
                  },
                  marginRight: 2,
                  marginLeft: 0,
                  width: '100%',
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, padding: '5px 10px' }}
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <IconButton sx={{ p: '10px' }} aria-label="clear search" onClick={() => setSearchQuery('')}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
              <Tooltip title="Search" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="error">
                    <NotificationIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar
                    src={user?.avatar || ''}
                    alt={user?.name || 'User'}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Mobile drawer */}
        <SwipeableDrawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {drawerContent}
        </SwipeableDrawer>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setDarkMode(!darkMode)}>
            <ListItemIcon>
              {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </ListItemIcon>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem selected={sortBy === 'createdAt'} onClick={() => handleSort('createdAt')}>
            Date Created
          </MenuItem>
          <MenuItem selected={sortBy === 'dueDate'} onClick={() => handleSort('dueDate')}>
            Due Date
          </MenuItem>
          <MenuItem selected={sortBy === 'priority'} onClick={() => handleSort('priority')}>
            Priority
          </MenuItem>
          <MenuItem selected={sortBy === 'title'} onClick={() => handleSort('title')}>
            Alphabetical
          </MenuItem>
        </Menu>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, pt: { xs: 9, sm: 10 }, pb: 10 }}>
          <Container maxWidth="lg" sx={{ mt: 2 }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', mb: 4, mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    My Tasks
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <Button
    variant="outlined"
    startIcon={
      sortBy === 'createdAt' ? <SortIcon /> :
      sortBy === 'title' ? <ListIcon /> :
      sortBy === 'priority' ? <FlagIcon /> :
      <CalendarIcon />
    }
    onClick={handleSortOpen}
  >
    Sort
  </Button>
  <Button
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    onClick={() => {
      setEditingTask(null);
      setFormOpen(true);
    }}
  >
    Add Task
  </Button>
</Box>
              </Box>
            )}

            {/* Filter tabs */}
            <Paper sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant={isMobile ? "fullWidth" : "standard"}
                centered={!isMobile}
                aria-label="task filter tabs"
              >
                {tabLabels.map((tab, index) => (
                  <Tab 
                    key={tab.value} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {tab.label}
                        <Chip 
                          size="small" 
                          label={tasks.filter(t => 
                            tab.value === 'all' ? true : 
                            tab.value === 'active' ? !t.completed : 
                            t.completed
                          ).length} 
                          color={tab.value === 'completed' ? 'success' : tab.value === 'active' ? 'primary' : 'default'}
                        />
                      </Box>
                    } 
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Search box for mobile */}
            {isMobile && (
              <Paper sx={{ p: 1, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    fullWidth
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </Box>
              </Paper>
            )}

            {/* View type toggle and sort for mobile */}
            {isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<SortIcon />}
                  onClick={handleSortOpen}
                >
                  {sortBy === 'createdAt' ? 'Date' : 
                   sortBy === 'title' ? 'Name' : 
                   sortBy === 'priority' ? 'Priority' : 'Due Date'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={viewType === 'card' ? <ListIcon /> : <CategoryIcon />}
                  onClick={() => setViewType(viewType === 'card' ? 'list' : 'card')}
                >
                  {viewType === 'card' ? 'List View' : 'Card View'}
                </Button>
              </Box>
            )}

            {/* Loading state */}
            {isLoading ? (
              <Box sx={{ mt: 4 }}>
                {viewType === 'card' ? (
                  <Grid container spacing={3}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item}>
                        <Skeleton variant="rounded" height={180} sx={{ borderRadius: 4 }} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack spacing={2}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Skeleton key={item} variant="rounded" height={70} sx={{ borderRadius: 2 }} />
                    ))}
                  </Stack>
                )}
              </Box>
            ) : filteredTasks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {searchQuery 
                    ? 'No tasks match your search' 
                    : filter === 'completed' 
                      ? 'No completed tasks' 
                      : filter === 'active' 
                        ? 'No active tasks' 
                        : 'No tasks found'}
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setEditingTask(null);
                    setFormOpen(true);
                  }}
                >
                  Add your first task
                </Button>
              </Box>
            ) : (
              <>
                {/* Task List View */}
                {viewType === 'list' ? (
                  <Paper sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                    <List sx={{ p: 0 }}>
                      {filteredTasks.map((task) => (
                        <ListItem
                          key={task._id}
                          sx={{ 
                            p: 0, 
                            mb: 0,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': {
                              borderBottom: 'none'
                            },
                            bgcolor: task.completed ? alpha(themeObject.palette.success.main, 0.05) : 'inherit',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 2, px: 3 }}>
                                <Checkbox
                                  edge="start"
                                  checked={task.completed}
                                  onChange={() => toggleComplete(task._id, task.completed)}
                                  sx={{ 
                                    p: 0,
                                    color: priorityColors[task.priority],
                                    '&.Mui-checked': {
                                      color: darkMode ? themeObject.palette.success.light : themeObject.palette.success.main,
                                    }
                                  }}
                                />
                                <Box sx={{ ml: 1, flexGrow: 1 }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      textDecoration: task.completed ? 'line-through' : 'none',
                                      color: task.completed ? 'text.secondary' : 'text.primary',
                                      fontWeight: 500,
                                    }}
                                  >
                                    {task.title}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1.5 }}>
                                  {task.priority && task.priority !== 'none' && (
  <Chip
    size="small"
    label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
    sx={{
      backgroundColor: alpha(priorityColors[task.priority] || '#ccc', 0.1),
      color: priorityColors[task.priority] || '#000',
      fontWeight: 600,
    }}
  />
)}
                                    
                                    {task.dueDate && (
                                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                        <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                                        <Typography variant="body2">
                                          {formatDate(task.dueDate)}
                                        </Typography>
                                      </Box>
                                    )}
                                    
                                    <Chip
                                      size="small"
                                      label={getStatusText(task)}
                                      color={getStatusColor(task)}
                                      variant="outlined"
                                    />
                                  </Box>
                                </Box>
                                
                                <Box>
                                  <IconButton
                                    edge="end"
                                    onClick={() => handleEdit(task)}
                                    color="primary"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    onClick={() => setConfirmDelete({ open: true, taskId: task._id })}
                                    color="error"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ) : (
                  // Card View
                  <Grid container spacing={3}>
                    {filteredTasks.map((task) => (
                      <Grid item xs={12} sm={6} md={4} key={task._id}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            background: task.bgGradient,
                            opacity: task.completed ? 0.8 : 1,
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              display: 'flex',
                              gap: 0.5,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(task)}
                              sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => setConfirmDelete({ open: true, taskId: task._id })}
                              sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <CardContent sx={{ pt: 6, pb: 2, flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Checkbox
                                checked={task.completed}
                                onChange={() => toggleComplete(task._id, task.completed)}
                                sx={{ 
                                  ml: -1,
                                  p: 0.5,
                                  color: priorityColors[task.priority],
                                  '&.Mui-checked': {
                                    color: darkMode ? themeObject.palette.success.light : themeObject.palette.success.main,
                                  }
                                }}
                              />
                              <Typography
                                variant="h6"
                                sx={{
                                  ml: 0.5,
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                  color: darkMode ? 'white' : 'text.primary',
                                  opacity: task.completed ? 0.7 : 1,
                                }}
                              >
                                {task.title}
                              </Typography>
                            </Box>
                            
                            {task.description && (
                              <Typography
                                variant="body2"
                                color={darkMode ? 'rgba(255,255,255,0.8)' : 'text.secondary'}
                                sx={{
                                  mb: 2,
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                  opacity: task.completed ? 0.7 : 1,
                                }}
                              >
                                {task.description}
                              </Typography>
                            )}
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                            {task.priority && task.priority !== 'none' && (
  <Chip
    size="small"
    label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
    sx={{
      backgroundColor: alpha(priorityColors[task.priority], darkMode ? 0.2 : 0.1),
      color: darkMode ? 'white' : priorityColors[task.priority],
      fontWeight: 600,
    }}
  />
)}

                              
                              {task.dueDate && (
                                <Chip
                                  size="small"
                                  icon={<CalendarIcon />}
                                  label={formatDate(task.dueDate)}
                                  sx={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: darkMode ? 'white' : 'text.primary',
                                  }}
                                />
                              )}
                              
                              <Chip
                                size="small"
                                label={getStatusText(task)}
                                color={getStatusColor(task)}
                                variant={darkMode ? "filled" : "outlined"}
                                sx={{ ml: 'auto' }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Container>
        </Box>

        {/* Floating action button */}
        <Zoom in={!formOpen}>
          <Fab
            color="primary"
            aria-label="add task"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
            onClick={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        {/* Task form dialog */}
        <Dialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { borderRadius: 4 }
          }}
        >
          <DialogTitle>
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
          <DialogContent dividers>
            <TaskForm
              onSubmit={handleFormSubmit}
              initialTask={editingTask}
              onCancel={() => setFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete confirmation dialog */}
        <Dialog
          open={confirmDelete.open}
          onClose={() => setConfirmDelete({ open: false, taskId: null })}
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this task? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete({ open: false, taskId: null })}>
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => deleteTask(confirmDelete.taskId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({ ...notification, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            variant="filled"
            elevation={6}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default TodoList;

