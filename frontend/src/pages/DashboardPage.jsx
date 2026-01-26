import React from 'react'
import Box from '@mui/material/Box'
import { ContactGrid } from '../components/ContactGrid'
import { Toolbar, Typography } from '@mui/material'


export const DashboardPage = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", px: 2 }}>
    <Typography
      variant="h1"
      sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, textAlign: 'center', maxWidth: '100%' }}
    >
      Dashboard
    </Typography>
    <Toolbar />
    <ContactGrid />
    </Box>
  )
}
