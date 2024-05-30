import { format, isFuture } from "date-fns";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip, IconButton, Tooltip } from "@mui/material";

function VisitRow({ visit, handleDeleteButton }) {
  const navigate = useNavigate();
  return (
    <Tooltip
      arrow
      enterDelay={200}
      placement="top"
      title={
        visit.report_content !== "" ? (
          <>
            <p>{visit.report_content.substring(0, 500)}</p>
          </>
        ) : (
          "Le compte-rendu n'a pas encore été rédigé"
        )
      }
    >
      <TableRow
        key={visit._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {isFuture(visit.date) ? (
            <Chip label="A venir" color="success" variant="outlined" />
          ) : (
            <Chip label="Passée" color="primary" variant="outlined" />
          )}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {format(visit.date, "dd/MM/yyyy")}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {visit.client.lastname} {visit.client.firstname}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {visit.article.name}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {visit.article_nb}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {visit.sales} €
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Tooltip title="Voir">
            <IconButton
              color="primary"
              aria-label="see-visit"
              onClick={() => navigate(`/visit/${visit._id}/see`)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Modifier">
            <IconButton
              color="primary"
              aria-label="edit-visit"
              onClick={() => navigate(`/visit/${visit._id}/modify`)}
            >
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
    </Tooltip>
  );
}
export default VisitRow;
