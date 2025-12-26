import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';


import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Adb as AdbIcon,
  Send as SendIcon,
} from '@mui/icons-material';

import { styled, keyframes } from '@mui/system';

// Animation keyframes for scrolling testimonials
const scrollLoop = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Styled component for the scrolling container
const ScrollingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  animation: `${scrollLoop} 20s linear infinite`,
  minWidth: '200%', // twice the width to allow smooth scrolling
}));

const pages = ['Events', 'Home', 'About', 'Contact Us'];
const settings = ['Booking status', 'Reviews', 'Logout'];

// Dummy testimonials data (You should replace with your actual data)
// const testimonials = [
//   { name: 'Alice', review: 'Great event, had a wonderful time!' },
//   { name: 'Bob', review: 'Smooth booking process and fantastic concerts.' },
//   { name: 'Charlie', review: 'I love the variety of events available here.' },
//   { name: 'Diana', review: 'Highly recommend this platform for event booking!' },
// ];

export default function Userhome() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  

  // Navigation Menu handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    if (page === 'About' || page === 'Contact Us') {
      const sectionId = page.toLowerCase().replace(/\s/g, '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (page === 'Events') {
      navigate('/userviewevents');
    } else if (page === 'Home') {
      const section = document.getElementById('home');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      console.log(`Navigation for "${page}" is not yet handled.`);
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Booking status') {
      navigate('/booking-status');
    } else if (setting === 'Reviews') {
      navigate('/review');
    } else if (setting === 'Logout') {
      localStorage.removeItem('usertoken');
      navigate('/');
    }
  };

  // Contact form state and handlers
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      await axios.post('https://eventum-w3x5.onrender.com/contact/create', form);
      setSuccess('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSuccess('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const itemData = [
  { img: 'https://i.pinimg.com/736x/80/db/fb/80dbfbfb1bfb129f9b655a07b4221a63.jpg', title: 'Bed' },
  { img: 'https://i.pinimg.com/736x/55/16/57/5516576515daa5c2a855b5a23268973c.jpg', title: 'Books' },
  { img: 'https://i.pinimg.com/736x/0e/25/72/0e2572fa5003bf814230f2b3826837c1.jpg', title: 'Sink' },
  { img: 'https://i.pinimg.com/736x/ac/fd/5f/acfd5fd133279acc0d188bb08674960c.jpg', title: 'Kitchen' },
  { img: 'https://i.pinimg.com/736x/64/aa/31/64aa3189cdef60e854af39dd2af755da.jpg', title: 'Blinds' },
  { img: 'https://i.pinimg.com/736x/9c/64/fc/9c64fc09ca8bd189d89b5227dd8a9a96.jpg', title: 'Chairs' },
  { img: 'https://i.pinimg.com/736x/62/58/85/625885716dfe1f4913d75b29cb4d34ad.jpg', title: 'Laptop' },
  { img: 'https://i.pinimg.com/736x/b1/60/33/b16033b8db744d60b6de5ee94259d1c9.jpg', title: 'Doors' },
  { img: 'https://i.pinimg.com/736x/60/4a/8a/604a8a04a088841200142b079e10058f.jpg', title: 'Coffee' },
  { img: 'https://i.pinimg.com/736x/e4/21/ca/e421ca0e1fc003116496fa2e502471d5.jpg', title: 'Storage' },
  { img: 'https://i.pinimg.com/736x/f7/f4/9f/f7f49f827677c21c0a83c901c8d9320b.jpg', title: 'Candle' },
  { img: 'https://i.pinimg.com/736x/8b/57/91/8b5791ac7e27040b211652e750696e37.jpg', title: 'Coffee table' },
  { img: 'https://i.pinimg.com/736x/bc/24/af/bc24af79f88177385c1a723ae46cd6e5.jpg'},
  { img: 'https://i.pinimg.com/736x/04/8b/67/048b67b1e05e06db901e173eafa86f2d.jpg'}
];

  
   const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://eventum-w3x5.onrender.com/reviews/all')

        // Duplicate testimonials for seamless looping
        setTestimonials([...response.data, ...response.data]);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);





  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* home section */}
      <Container id="home" maxWidth="md" sx={{
  mt: 4,
  mb: 4,
  p: 4,
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: 4,
}}
>
       <Typography variant="h4" textAlign="center" color="primary" gutterBottom fontWeight="bold" >
          EVENTUM
        </Typography>
        <Typography variant="body1" color="text.primary" textAlign="center" >
          The Eventum offers a modern and efficient way for users to book tickets
          for concerts online. It eliminates the need for physical ticket counters
          and long queues, providing a smooth, fast, and secure booking experience.
          Users can easily browse events, coordinator can add their events, and also
          aviod the middlers.
        </Typography>
      </Container>

      {/* About Section */}
      <Container id="about" maxWidth="md" sx={{
  mt: 4,
  mb: 4,
  p: 4,
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: 3,
}}
>
       <Typography variant="h4" textAlign="center" color="primary" gutterBottom fontWeight="bold" >
          About Our Concerts & Programs
        </Typography>
       <Typography variant="body1" color="text.primary" textAlign="center" >
          Welcome to our platform! We are passionate about bringing people together
          through music and entertainment...
        </Typography>
      </Container>

      {/* Image Section */}
     <Container maxWidth="md" sx={{ mb: 6, backgroundColor: 'white', p: 3, borderRadius: 3, boxShadow: 3 }}>

        <Box sx={{ width: "100%", height: 450, overflowY: 'scroll', mx: 'auto' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  // src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ borderRadius: 8, border: '2px solid black' }}

                />
                <ImageListItemBar position="below" title={item.author} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>

      {/* Section Heading */}
      <Typography
        variant="h4"
        sx={{
        color: 'primary.main',
        mb: 3,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
      }}

      >
        What Our Customers Say
      </Typography>

      {/* Auto-Scrolling Testimonials */}
      <Box
        sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        mx: 'auto',
        maxWidth: 1000,
        mb: 4,
        p: 2,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 2,
      }}

      >
        <ScrollingBox>
          {/* Duplicate testimonials to create infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card
              key={index}
              sx={{
              minWidth: 300,
              backgroundColor: '#0355cc',
              border: '2px solid black',
              color: 'white',
              p: 2,
              mx: 1,
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'black', mb: 1 }}>
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontStyle: 'italic',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                >
                  “{testimonial.review}”
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ScrollingBox>
      </Box>

      <Box textAlign="center" mb={6}>
        <Button variant="contained"
        sx={{
    backgroundColor: 'black',
    color: 'white',
    px: 4,
    py: 1,
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'primary.main',
      color: 'black',
    },
  }} onClick={() => navigate('/testimonials')}>
          Leave a Review
        </Button>
      </Box>

      {/* Contact Us Section */}
      <Container id="contactus" maxWidth="sm" sx={{
        mt: 6,
        mb: 6,
        p: 4,
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: 4,
      }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We'd love to hear from you! Fill out the form below and we'll get back to you soon.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: '#f0f0f0',
                border: '1px solid black',
                borderRadius: 2,
              }}

            >
              <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Your Name"
                  variant="outlined"
                  value={form.name}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  input: { color: 'black' },
                  label: { color: 'black' },
                }}

                />

                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                 sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  input: { color: 'black' },
                  label: { color: 'black' },
                }}

                />

                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  name="message"
                  label="Message"
                  variant="outlined"
                  value={form.message}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  input: { color: 'black' },
                  label: { color: 'black' },
                  }}

                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  disabled={loading}
                  sx={{
  mt: 2,
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'black',
  },
}}

                >
                  {loading ? 'Sending...' : 'Send'}
                </Button>

                {success && (
                  <Typography
                    variant="body2"
                    align="center"
                    color={success.includes('successfully') ? 'success.main' : 'error.main'}
                    sx={{ mt: 2 }}
                  >
                    {success}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

 {/* Footer Section */}
<Box
  component="footer"
  sx={{
    py: 4,
    px: 2,
    mt: 8,
    backgroundColor: '#0355cc',
    color: 'white',
    textAlign: 'center',
  }}
>
  <Container maxWidth="md">
    <Typography variant="h6" gutterBottom>
      EVENTUM
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Bringing you the best concerts and events experience.
    </Typography>
    <Divider sx={{ bgcolor: 'white', mb: 2 }} />
    <Box display="flex" justifyContent="center" gap={4}>
      <Link
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener"
        color="inherit"
        underline="none"
        sx={{ '&:hover': { color: '#E1306C' } }}
      >
        <InstagramIcon fontSize="large" />
      </Link>
      <Link
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener"
        color="inherit"
        underline="none"
        sx={{ '&:hover': { color: '#1877F2' } }}
      >
        <FacebookIcon fontSize="large" />
      </Link>
      <Link
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener"
        color="inherit"
        underline="none"
        sx={{ '&:hover': { color: '#FF0000' } }}
      >
        <YouTubeIcon fontSize="large" />
      </Link>
    </Box>
    <Typography variant="caption" display="block" sx={{ mt: 2 }}>
      &copy; {new Date().getFullYear()} Eventum. All rights reserved.
    </Typography>
  </Container>
</Box>


    </>
  );
}
