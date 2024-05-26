import { useEffect, useState } from "react";
import { deleteVisit, getAllVisitsWithCommercialId } from "../services/visits";
import connexion from "../services/connexion";

import { TableSortLabel, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisitRow from "../components/VisitRow";
import PaginationComponent from "../components/PaginationComponent";

function ReportList() {
  const [visits, setVisits] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultNb, setResultNb] = useState(10);
  const [allVisitsNb, setAllVisitsNb] = useState(0);

  useEffect(() => {
    const getVisitsNb = async () => {
      try {
        const result = await connexion.get("/visits/count");
        setAllVisitsNb(result.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    const getAllVisitsWithCommercialId = async () => {
      try {
        let url = `/visits?resultNb=${resultNb}&currentPage=${currentPage}`;
        if (sortType && sortDirection)
          url += `&sort=${sortType}&direction=${sortDirection}`;
        const response = await connexion.get(url);
        setVisits(response.data);
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    getAllVisitsWithCommercialId();
    getVisitsNb();
  }, [resultNb, currentPage, sortType, sortDirection]);
  const pageNb = Math.ceil(allVisitsNb / resultNb);

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
          {pageNb > 1 && (
            <PaginationComponent
              pageNb={pageNb}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <div>Pas encore de visites</div>
      )}
    </div>
  );
}

export default ReportList;
