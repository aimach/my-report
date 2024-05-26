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
  return (
    client && (
      <Box component="section" sx={{ p: 2 }} gap={4}>
        <Typography variant="h6">
          {client.firstname} {client.lastname}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={client.address} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={client.mail} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText primary={client.phone} />
          </ListItem>
        </List>
      </Box>
    )
  );
}
