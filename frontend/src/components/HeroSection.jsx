import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <Box>
      <Box component="h1" >Welcome to Team 5 Contacts App!</Box>
      <Box>
        <MenuBookIcon sx={{fontSize: 350}}></MenuBookIcon>
      </Box>
      {/* Replace below with API */}
      <Box component="h1">Join our ____ users</Box>

      <Button variant="contained" size="large" component={Link} to="/register"> Register an account here!</Button>
    </Box>
  )
}
