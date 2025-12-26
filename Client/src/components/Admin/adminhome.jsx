import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {Grid,Paper, Card,CardContent} from '@mui/material';



import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useState,useEffect } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';

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





const pages = ['View Details','Home', 'About'];
const settings = [ 'Reviews', 'Logout'];

export default function Adminhome() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
  setAnchorElNav(null);

  if (page === 'About' ) {
    const sectionId = page.toLowerCase().replace(/\s/g, '');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (page === 'View Details') {
    navigate('/adminviewevents'); // 
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

  if (setting === 'Logout') {
    localStorage.removeItem('token'); 
    navigate('/');
  } else if (setting === 'Reviews') {
    navigate('/review');
  }
};




const itemWidth = 300; // Or whatever width you want


  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://eventum-w3x5.onrender.com/reviews/all');
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

<Container maxWidth="md" sx={{ backgroundColor: 'white', py: 4, borderRadius: 3 }}>
  <Box sx={{ width: '100%', height: 450, overflowY: 'scroll', mx: 'auto' }}>
    <ImageList variant="masonry" cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            // src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{ borderRadius: '10px', border: '2px solid black' }}
          />
          <ImageListItemBar position="below" title={item.author} sx={{ color: 'primary.main' }} />
        </ImageListItem>
      ))}
    </ImageList>
  </Box>
</Container>

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
    backgroundColor: '#f9f9f9',
    p: 2,
    borderRadius: 2,
    border: '1px solid black',
  }}
>
  <ScrollingBox>
    {[...testimonials, ...testimonials].map((testimonial, index) => (
      <Card
        key={index}
        sx={{
          minWidth: 300,
          backgroundColor: 'white',
          border: '2px solid black',
          p: 2,
          flexShrink: 0,
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
              color: 'text.secondary',
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
  <Button
    variant="contained"
    color="primary"
    onClick={() => navigate('/testimonials')}
    sx={{
      backgroundColor: 'black',
      color: 'white',
      '&:hover': {
        backgroundColor: 'primary.main',
        color: 'black',
      },
    }}
  >
    Leave a Review
  </Button>
</Box>




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