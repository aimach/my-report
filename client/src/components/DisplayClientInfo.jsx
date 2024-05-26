import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import connexion from "../services/connexion";

export default function DisplayClientInfo({ clientId }) {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const getClientById = async (id) => {
      try {
        let url = `/clients/${id}`;
        const response = await connexion.get(url);
        setClient(response.data);
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    getClientById(clientId);
  });

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
