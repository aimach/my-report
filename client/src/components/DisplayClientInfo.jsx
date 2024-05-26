import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function DisplayClientInfo({ client }) {
  return (
    client && (
      <Box component="section" sx={{ p: 2 }}>
        <Typography variant="h6">
          {client.firstname} {client.lastname}
        </Typography>
        <Typography variant="body1">{client.address}</Typography>
        <Typography variant="body1">{client.mail}</Typography>
        <Typography variant="body1">{client.phone}</Typography>
      </Box>
    )
  );
}
