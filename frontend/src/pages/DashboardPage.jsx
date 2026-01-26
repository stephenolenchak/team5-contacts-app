import React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { ContactGrid } from '../components/ContactGrid'
import { Toolbar, Typography } from '@mui/material'


export const DashboardPage = () => {
  return (
    <Box sx={{ width: '100%', height: '100%',display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
    <Typography variant="h1">Dashboard</Typography>
    <Toolbar />
    <ContactGrid />
    </Box>
  )
}
