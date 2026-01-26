import { Suspense, lazy } from 'react'
import { Navbar } from './components/NavBar'
import Toolbar from '@mui/material/Toolbar'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Footer from './components/Footer';
import { Grow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const IndexPage = lazy(() =>
  import('./pages/IndexPage').then((module) => ({ default: module.IndexPage }))
)
const Register = lazy(() =>
  import('./pages/RegisterPage').then((module) => ({ default: module.Register }))
)
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
)

function App() {
  const loader = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <CircularProgress color="inherit" />
    </Box>
  )

  return (
    <>
      <ThemeProvider theme={theme} sx>
        <CssBaseline />
        <Navbar />
        <Toolbar />
        <Grow in timeout={400} style={{ transformOrigin: '0 0 0' }}>
          <Box sx={{ textAlign: 'center', backgroundColor: "#0f243a", width: "95vw", height: "83.7vh", margin: "0 auto", borderRadius: 10, mt: 4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", }}>
            <Box sx={{ height: 24 }} />
            <Suspense fallback={loader}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </Suspense>
          </Box>
        </Grow>
        <Toolbar />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
