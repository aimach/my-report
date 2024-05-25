import { format, isFuture } from "date-fns";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

function VisitRow({ visit, handleDeleteButton }) {
  return (
    <TableRow
      key={visit.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {isFuture(visit.date) ? "Passée" : "A venir"}
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
        <Button color="primary" variant="contained" size="small" component="a">
          Modifier
        </Button>{" "}
        <Button
          color="primary"
          variant="contained"
          size="small"
          component="a"
          onClick={() => handleDeleteButton(visit._id)}
        >
          Supprimer
        </Button>
      </TableCell>
    </TableRow>
  );
}
export default VisitRow;
