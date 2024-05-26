import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // on redirige l'utilisateur s'il n'est pas directeur
    if (profile && profile.is_director === false) {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div>
      <Typography variant="h4" color="text.primary">
        Dashboard
      </Typography>
    </div>
  );
}

export default DirectorPage;
