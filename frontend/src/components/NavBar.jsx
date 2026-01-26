import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit"}}>
            Clean Contacts
          </Typography>
          <Box sx={{ flexGrow: 1}}></Box>
          <Button color="inherit"  component={Link} to="/register">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
