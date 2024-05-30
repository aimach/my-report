import { useEffect, useState } from "react";
import { deleteVisit, getAllVisitsWithCommercialId } from "../services/visits";
import connexion from "../services/connexion";
import VisitRow from "../components/VisitRow";
import PaginationComponent from "../components/PaginationComponent";

import {
  TableSortLabel,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SnackBarComponent from "../components/SnackBarComponent";

function ReportList() {
  const resultNb = 10; // on définit le nombre de visites par page
  const [visits, setVisits] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [allVisitsNb, setAllVisitsNb] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "Bien supprimé !",
    severity: "success",
  });
  const columnLabels = [
    { name: "Statut", type: "sorted", sortType: "date", align: "center" },
    { name: "Date", type: "notSorted", sortType: null, align: "center" },
    { name: "Client", type: "sorted", sortType: "client", align: "center" },
    {
      name: "Article",
      type: "sorted",
      sortType: "article",
      align: "center",
    },
    { name: "Nombre", type: "notSorted", sortType: null, align: "right" },
    { name: "Montant", type: "sorted", sortType: "sales", align: "right" },
    { name: "Actions", type: "notSorted", sortType: null, align: "center" },
  ];

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
    const isDeleted = await deleteVisit(visitId);
    if (isDeleted) {
      setAlert({ ...alert, open: true });
      const visitsAfterDelete = await getAllVisitsWithCommercialId();
      setVisits(visitsAfterDelete);
    } else {
      setAlert({
        open: true,
        message: "Oups ! Le compte rendu n'a pas pu être supprimé",
        severity: "error",
      });
    }
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
          pb: { xs: 8, sm: 8 },
          fontWeight: 500,
        }}
        color="primary"
      >
        Mes comptes rendus
      </Typography>
      {visits.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columnLabels.map((label, index) =>
                    label.type === "sorted" ? (
                      <TableCell align={label.align} key={index}>
                        <TableSortLabel
                          active={sortType === label.sortType}
                          direction={sortDirection}
                          onClick={() => handleSortLabel(label.sortType)}
                        >
                          {label.name}
                        </TableSortLabel>
                      </TableCell>
                    ) : (
                      <TableCell key={index} align={label.align}>
                        {label.name}
                      </TableCell>
                    )
                  )}
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
        </>
      ) : (
        <CircularProgress />
      )}
      <SnackBarComponent alert={alert} setAlert={setAlert} />
    </Container>
  );
}

export default ReportList;
