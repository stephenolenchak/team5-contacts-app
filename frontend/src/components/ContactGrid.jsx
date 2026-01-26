import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
]

const rows = [
    { id: 1, name: 'Bob', email: 'Bob@example.com' },
    { id: 2, name: 'Bill', email: 'Bill@example.com' },
    { id: 3, name: 'Dan', email: 'Dan@example.com' },
]

export const ContactGrid = () => {
    return (
        <Box sx={{ height: "80%", width: '80%' }}>
            <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 15, 20]} />
        </Box>
    )
}
