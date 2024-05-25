import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { deleteVisit, getAllVisitsWithCommercialId } from "../services/visits";

import { TableSortLabel, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisitRow from "../components/VisitRow";

function ReportList() {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visits, setVisits] = useState(useLoaderData());
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    if (!connected) {
      navigate("/login");
    }
  }, [connected, navigate]);

  const handleDeleteButton = async (visitId) => {
    await deleteVisit(visitId);
    const visitsAfterDelete = await getAllVisitsWithCommercialId();
    setVisits(visitsAfterDelete);
  };

  const handleSortLabel = async (sortType) => {
    if (sortDirection === "asc") setSortDirection("desc");
    if (sortDirection === "desc") setSortDirection("asc");

    setSortType(sortType);
    const sortedVisits = await getAllVisitsWithCommercialId(
      sortType,
      sortDirection
    );
    setVisits(sortedVisits);
  };

  return (
    <div>
      <Typography variant="h4" color="text.primary">
        Gérer mes comptes rendus
      </Typography>
      {visits.length ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortType === "date"}
                      direction={sortDirection}
                      onClick={() => handleSortLabel("date")}
                    >
                      Statut
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Date</TableCell>

                  <TableCell align="center">
                    <TableSortLabel
                      active={sortType === "client"}
                      direction={sortDirection}
                      onClick={() => handleSortLabel("client")}
                    >
                      Client
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="center">
                    <TableSortLabel
                      active={sortType === "article"}
                      direction={sortDirection}
                      onClick={() => handleSortLabel("article")}
                    >
                      Article
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortType === "sales"}
                      direction={sortDirection}
                      onClick={() => handleSortLabel("sales")}
                    >
                      Montant
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visits.map((row) => (
                  <VisitRow
                    visit={row}
                    handleDeleteButton={handleDeleteButton}
                    key={row._id}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>Pas encore de visites</div>
      )}
    </div>
  );
}

export default ReportList;
