import Box from '@mui/material/Box'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditContact from './EditContact';
import ContactSearch from './ContactSearch';
import { Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteContact from './DeleteContact';

const rows = [
  { id: 1, name: 'Bob', email: 'Bob@example.com' },
  { id: 2, name: 'Bill', email: 'Bill@example.com' },
  { id: 3, name: 'Dan', email: 'Dan@example.com' },
];

export const ContactGrid = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = (id) => {
    console.log("Delete contact id:", id);
    setDeleteOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 100 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedRow(params.row);
            setEditOpen(true);
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedRow(params.row);
            setDeleteOpen(true);
          }}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: "80%", width: '80%' }}>
      <Stack spacing={2}>
        <ContactSearch />

        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 30, 50, 100]}
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              lineHeight: "1.3",
              py: 1,
              wordBreak: "break-word",
            },
          }}
        />

        <EditContact
          open={editOpen}
          contact={selectedRow}
          onClose={() => setEditOpen(false)}
        />

        <DeleteContact
          open={deleteOpen}
          contact={selectedRow}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />

      </Stack>
    </Box>
  );
};
