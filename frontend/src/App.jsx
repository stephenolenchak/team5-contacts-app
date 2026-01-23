import { useState } from 'react'
import './App.css'
import { Navbar } from './components/NavBar'
import Toolbar from '@mui/material/Toolbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const customTheme = createTheme({
  palette: {
    mode: "dark"
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar></Navbar>
        <Toolbar>
        </Toolbar>
      </ThemeProvider>
      <Box></Box>
    </>
  )
}

export default App
