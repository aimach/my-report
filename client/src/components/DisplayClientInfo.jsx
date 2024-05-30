import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

export default function DisplayClientInfo({ client }) {
  console.log(client);
  const labels = [
    { name: "address", icon: <HomeIcon /> },
    { name: "mail", icon: <EmailIcon /> },
    { name: "phone", icon: <LocalPhoneIcon /> },
  ];
  return (
    client && (
      <Box component="section" sx={{ p: 2 }} gap={4}>
        <Typography variant="h6">
          {client.firstname} {client.lastname}
        </Typography>
        <List>
          {labels.map((label, index) => {
            return (
              <ListItem key={index}>
                <ListItemIcon>{label.icon}</ListItemIcon>
                <ListItemText primary={client[`${label.name}`]} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    )
  );
}
