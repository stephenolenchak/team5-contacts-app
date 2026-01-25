import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        px: 2,
        textAlign: "center",
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Clean Contacts
      </Typography>
    </Box>
  );
}
