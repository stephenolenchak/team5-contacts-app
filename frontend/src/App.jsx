import { useState } from 'react'
import { Navbar } from './components/NavBar'
import Toolbar from '@mui/material/Toolbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"
import { Register } from "./pages/RegisterPage";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { IndexPage } from "./pages/IndexPage";
import Box from '@mui/material/Box';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme} sx>
        <CssBaseline />
        <Navbar />
        <Toolbar />
        <Box  sx={{textAlign: 'center'}}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
