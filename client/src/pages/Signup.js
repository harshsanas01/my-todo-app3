

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Paper,
//   Box,
//   Grid,
//   Typography,
//   Container,
//   createTheme,
//   ThemeProvider,
//   Alert,
//   useMediaQuery,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8e24aa', // Purple
//       light: '#c158dc',
//       dark: '#5c007a',
//     },
//     secondary: {
//       main: '#00e5ff', // Bright cyan
//       light: '#6effff',
//       dark: '#00b2cc',
//     },
//     background: {
//       default: '#f0f7ff',
//       paper: '#ffffff',
//     },
//     success: {
//       main: '#00c853',
//     },
//     error: {
//       main: '#ff3d00',
//     },
//   },
//   typography: {
//     fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 700,
//       background: 'linear-gradient(45deg, #8e24aa 30%, #c158dc 90%)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 30,
//           padding: '12px 24px',
//           textTransform: 'none',
//           fontWeight: 600,
//           fontSize: '1rem',
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           marginBottom: 16,
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 15,
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 20,
//         },
//       },
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           width: 56,
//           height: 56,
//         },
//       },
//     },
//   },
// });

// const Signup = () => {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         {!isMobile && (
//           <Grid
//             item
//             xs={false}
//             sm={5}
//             md={7}
//             sx={{
//               backgroundImage: 'url(https://source.unsplash.com/random?colorful,productivity)',
//               backgroundRepeat: 'no-repeat',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               position: 'relative',
//               '&::before': {
//                 content: '""',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: 'rgba(142, 36, 170, 0.3)',
//                 backgroundImage: 'linear-gradient(135deg, rgba(0, 229, 255, 0.5) 0%, rgba(142, 36, 170, 0.5) 100%)',
//               },
//             }}
//           />
//         )}
//         <Grid 
//           item 
//           xs={12} 
//           sm={7} 
//           md={5} 
//           component={Paper} 
//           elevation={6} 
//           square
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             background: 'linear-gradient(to bottom right, #ffffff, #f8f9fe)',
//             boxShadow: isMobile ? 'none' : '0 8px 32px rgba(142, 36, 170, 0.1)',
//             borderRadius: isMobile ? 0 : '20px 0 0 20px',
//             px: { xs: 3, sm: 4, md: 6 },
//           }}
//         >
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: 450,
//             }}
//           >
//             <Avatar 
//               sx={{ 
//                 mb: 3, 
//                 background: 'linear-gradient(45deg, #8e24aa 30%, #c158dc 90%)',
//                 boxShadow: '0 4px 20px rgba(142, 36, 170, 0.25)',
//               }}
//             >
//               <LockOutlinedIcon fontSize="large" />
//             </Avatar>
//             <Typography 
//               component="h1" 
//               variant="h4" 
//               fontWeight="700" 
//               gutterBottom
//               align="center"
//             >
//               Create Account
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               align="center"
//               sx={{ mb: 4 }}
//             >
//               Join us today and start organizing your tasks effectively
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 variant="outlined"
//                 onChange={handleChange}
//                 InputProps={{
//                   sx: { 
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//                   }
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 variant="outlined"
//                 onChange={handleChange}
//                 InputProps={{
//                   sx: { 
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//                   }
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 variant="outlined"
//                 onChange={handleChange}
//                 InputProps={{
//                   sx: { 
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//                   }
//                 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ 
//                   mt: 4, 
//                   mb: 3, 
//                   py: 1.5,
//                   background: 'linear-gradient(45deg, #8e24aa 10%, #c158dc 90%)',
//                   boxShadow: '0 8px 16px rgba(142, 36, 170, 0.3)',
//                   '&:hover': {
//                     boxShadow: '0 12px 20px rgba(142, 36, 170, 0.4)',
//                     transform: 'translateY(-2px)',
//                   },
//                   transition: 'all 0.3s ease',
//                 }}
//               >
//                 Sign Up
//               </Button>
//               <Box 
//                 sx={{ 
//                   textAlign: 'center',
//                   mt: 2,
//                   p: 2,
//                   borderRadius: 3,
//                   background: 'rgba(0, 229, 255, 0.1)', 
//                 }}
//               >
//                 <Link to="/login" style={{ 
//                   color: theme.palette.primary.main, 
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                 }}>
//                   Already have an account? Sign in
//                 </Link>
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa', // Purple
      light: '#c158dc',
      dark: '#5c007a',
    },
    secondary: {
      main: '#00e5ff', // Bright cyan
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: {
      default: '#f0f7ff',
      paper: '#ffffff',
    },
    success: {
      main: '#00c853',
    },
    error: {
      main: '#ff3d00',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #8e24aa 30%, #c158dc 90%)',
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
  },
});

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Regex for password validation:
  // - Minimum eight characters
  // - At least one letter
  // - At least one number
  // - At least one special character (@$!%*#?&)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Basic email validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    // Password validation check
    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
      );
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              backgroundImage: 'url(https://source.unsplash.com/random?colorful,productivity)',
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
                backgroundColor: 'rgba(142, 36, 170, 0.3)',
                backgroundImage: 'linear-gradient(135deg, rgba(0, 229, 255, 0.5) 0%, rgba(142, 36, 170, 0.5) 100%)',
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
            background: 'linear-gradient(to bottom right, #ffffff, #f8f9fe)',
            boxShadow: isMobile ? 'none' : '0 8px 32px rgba(142, 36, 170, 0.1)',
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
                background: 'linear-gradient(45deg, #8e24aa 30%, #c158dc 90%)',
                boxShadow: '0 4px 20px rgba(142, 36, 170, 0.25)',
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" fontWeight="700" gutterBottom align="center">
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Join us today and start organizing your tasks effectively
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  sx: { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  sx: { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' },
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
                autoComplete="new-password"
                variant="outlined"
                onChange={handleChange}
                helperText="At least 8 characters, one letter, one number, one special character"
                InputProps={{
                  sx: { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 3,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #8e24aa 10%, #c158dc 90%)',
                  boxShadow: '0 8px 16px rgba(142, 36, 170, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(142, 36, 170, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up
              </Button>
              <Box
                sx={{
                  textAlign: 'center',
                  mt: 2,
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(0, 229, 255, 0.1)',
                }}
              >
                <Link
                  to="/login"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
