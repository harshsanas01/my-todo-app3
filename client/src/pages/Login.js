// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
//       login(res.data.token);
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
  useMediaQuery,
  Divider,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bfa5', // Teal
      light: '#5df2d6',
      dark: '#008e76',
    },
    secondary: {
      main: '#ff6d00', // Orange
      light: '#ff9e40',
      dark: '#c43e00',
    },
    background: {
      default: '#f0f7ff',
      paper: '#ffffff',
    },
    success: {
      main: '#00c853',
    },
    warning: {
      main: '#ffd600',
    },
    error: {
      main: '#ff3d00',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00bfa5 30%, #5df2d6 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          '& .MuiOutlinedInput-root': {
            borderRadius: 15,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 56,
          height: 56,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#00bfa5',
        },
      },
    },
  },
});

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} justifyContent={'center'} alignItems="center">
        <CssBaseline />
        {!isMobile && (
          <Grid
            item
            xs={false}
            sm={5}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?colorful,tasks)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 191, 165, 0.3)',
                backgroundImage: 'linear-gradient(135deg, rgba(255, 109, 0, 0.5) 0%, rgba(0, 191, 165, 0.5) 100%)',
              },
            }}
          />
        )}
        <Grid 
          item 
          xs={12} 
          sm={7} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #ffffff, #f0fffa)',
            boxShadow: isMobile ? 'none' : '0 8px 32px rgba(0, 191, 165, 0.1)',
            borderRadius: isMobile ? 0 : '20px 0 0 20px',
            px: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 450,
            }}
          >
            <Avatar 
              sx={{ 
                mb: 3, 
                background: 'linear-gradient(45deg, #00bfa5 30%, #5df2d6 90%)',
                boxShadow: '0 4px 20px rgba(0, 191, 165, 0.25)',
              }}
            >
              <LoginIcon fontSize="large" />
            </Avatar>
            <Typography 
              component="h1" 
              variant="h4" 
              fontWeight="700" 
              gutterBottom
              align="center"
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 4 }}
            >
              Log in to access your tasks and stay organized
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  sx: { 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  sx: { 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    value="remember" 
                    color="primary" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ 
                      color: theme.palette.primary.main,
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ 
                  mt: 4, 
                  mb: 3, 
                  py: 1.5,
                  background: 'linear-gradient(45deg, #00bfa5 10%, #5df2d6 90%)',
                  boxShadow: '0 8px 16px rgba(0, 191, 165, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(0, 191, 165, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(0, 191, 165, 0.1)', 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Link to="#" style={{ 
                      color: theme.palette.primary.main, 
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}>
                      Forgot password?
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(255, 109, 0, 0.1)', 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Link to="/signup" style={{ 
                      color: theme.palette.secondary.main, 
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}>
                      New user? Sign up
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;