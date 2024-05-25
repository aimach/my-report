import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function ReportList() {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate("/login");
    }
  }, [connected]);

  return <div>Page de gestion des comptes rendus</div>;
}

export default ReportList;
