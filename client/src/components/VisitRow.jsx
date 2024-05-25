import { format, isFuture } from "date-fns";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip, IconButton, Tooltip } from "@mui/material";

function VisitRow({ visit, handleDeleteButton }) {
  return (
    <TableRow
      key={visit.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {isFuture(visit.date) ? (
          <Chip label="Passé" color="primary" variant="outlined" />
        ) : (
          <Chip label="A venir" color="success" variant="outlined" />
        )}
      </TableCell>
      <TableCell component="th" scope="row">
        {format(visit.date, "dd/MM/yyyy")}
      </TableCell>
      <TableCell component="th" scope="row">
        {visit.client.firstname} {visit.client.lastname}
      </TableCell>
      <TableCell component="th" scope="row">
        {visit.article.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {visit.article_nb}
      </TableCell>
      <TableCell component="th" scope="row">
        {visit.sales} €
      </TableCell>
      <TableCell component="th" scope="row">
        <Tooltip title="Voir">
          <IconButton color="primary" aria-label="see-visit">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Modifier">
          <IconButton color="primary" aria-label="edit-visit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton
            color="error"
            aria-label="delete-visit"
            onClick={() => handleDeleteButton(visit._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
export default VisitRow;
