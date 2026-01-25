import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export const HeroSection = () => {
  return (
    <Box sx={{}}>
      <Typography variant="h2">Welcome to Clean Contacts!</Typography>
        <MenuBookIcon sx={{fontSize: 300}}></MenuBookIcon>
      {/* Replace below with API */}
      <Typography variant="h3">Join our ____ users!</Typography>
      <Box sx={{ height: 32 }} />
      <Button variant="contained" size="large" component={Link} to="/register"> Sign Up for Free!</Button>
    </Box>
  )
}
