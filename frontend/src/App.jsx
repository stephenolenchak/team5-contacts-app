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
import Footer from './components/Footer';
import { Grow } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme} sx>
        <CssBaseline />
        <Navbar />
        <Toolbar />
        <Grow in timeout={400} style={{ transformOrigin: '0 0 0' }}>
        <Box  sx={{textAlign: 'center', backgroundColor: "#0f243a", width: "95vw", height: "90vh", margin: "0 auto", borderRadius: 10, mt: 4,display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",}}>
        <Box sx={{ height: 24 }} />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
         </Grow>
      </ThemeProvider>
      <Toolbar />
      <Footer />
    </>
  )
}

export default App
