import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function VisitRow({ visit }) {
  return (
    <TableRow
      key={visit.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {visit.date}
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
        Modifier Supprimer
      </TableCell>
    </TableRow>
  );
}
export default VisitRow;
