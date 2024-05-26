import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { createVisit, updateVisit } from "../services/visits";
import connexion from "../services/connexion";
import SelectInput from "../components/SelectInput";
import DisplayClientInfo from "../components/DisplayClientInfo";
import DateSelect from "../components/DatePicker";

import {
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

function CreateReport() {
  const { clients, articles } = useLoaderData();
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "Bien enregistré !",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "new") {
      // si c'et une creation de compte rendu
      const newVisit = {
        client: "new",
        date: new Date(),
        report_content: "",
        article: articles[0]._id,
        article_nb: 0,
        sales: 0,
      };
      setVisit(newVisit);
    } else {
      // sinon on récupère les informations de la visite
      const getVisitById = async (visitId) => {
        try {
          const response = await connexion.get(`/visits/${visitId}`);
          setVisit(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getVisitById(id);
    }
  }, [articles, clients, id]);

  const handleArticleNb = (articleNb) => {
    const [selectedArticle] = articles.filter(
      (article) => article._id === visit.article
    );
    const totalPrice = selectedArticle.price * articleNb;
    setVisit({ ...visit, article_nb: articleNb, sales: totalPrice });
  };

  const submitVisitForm = async (event) => {
    event.preventDefault();
    const isCreatedOrUpdated =
      id === "new" ? await createVisit(visit) : await updateVisit(visit);
    if (isCreatedOrUpdated) {
      setAlert({ ...alert, open: true });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setAlert({
        open: true,
        message: "Oups ! Le compte rendu n'a pas pu être enregistré",
        severity: "error",
      });
    }
  };

  return (
    visit && (
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
          {id === "new" ? "Créer un compte rendu" : "Modifier un compte rendu"}
        </Typography>
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1 }} component="form" onSubmit={submitVisitForm}>
            <Grid container spacing={2}>
              <Grid xs={7.5}>
                <Paper
                  sx={{
                    backgroundColor: "#fff",
                    padding: 3,
                    textAlign: "left",
                    height: "370px",
                  }}
                >
                  <SelectInput
                    label="Client rencontré"
                    list={clients}
                    type="client"
                    visit={visit}
                    onChangeFunction={setVisit}
                    selectedItem={visit.client}
                  />
                  <DisplayClientInfo
                    client={
                      clients.filter((client) => client._id === visit.client)[0]
                    }
                  />
                </Paper>
              </Grid>
              <Grid xs={4.5}>
                <Paper
                  sx={{
                    backgroundColor: "#fff",
                    padding: 3,
                    textAlign: "left",
                    height: "370px",
                  }}
                >
                  <DateSelect
                    selectedDate={visit.date}
                    visit={visit}
                    setVisit={setVisit}
                  />
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Paper
                  sx={{
                    backgroundColor: "#fff",
                    padding: 3,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Compte rendu
                  </Typography>
                  <TextField
                    margin="normal"
                    id="reportContent"
                    name="reportContent"
                    label=""
                    autoFocus
                    fullWidth
                    multiline
                    minRows={10}
                    onChange={(event) =>
                      setVisit({ ...visit, report_content: event.target.value })
                    }
                    value={visit.report_content}
                    required
                  />
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Paper
                  sx={{
                    backgroundColor: "#fff",
                    padding: 3,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Articles vendus
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={4}>
                      <SelectInput
                        label="Articles"
                        list={articles}
                        type="article"
                        visit={visit}
                        onChangeFunction={setVisit}
                        selectedItem={visit.article}
                      />
                    </Grid>
                    <Grid xs={4}>
                      <TextField
                        margin="normal"
                        id="articleNb"
                        label="Nombre d'articles"
                        name="articleNb"
                        onChange={(event) =>
                          handleArticleNb(event.target.value)
                        }
                        value={visit.article_nb}
                        sx={{
                          textAlign: "right",
                          width: "100%",
                        }}
                        required
                      />
                    </Grid>
                    <Grid xs={4}>
                      <TextField
                        margin="normal"
                        id="sales"
                        label="Chiffre d'affaire"
                        name="sales"
                        value={`${visit.sales} €`}
                        sx={{
                          width: "100%",
                        }}
                        required
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid xs={12}>
                <Paper
                  sx={{
                    backgroundColor: "#fff",
                    padding: 3,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Prochaine visite
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={4}></Grid>
                    <Grid xs={4}></Grid>
                    <Grid xs={4}></Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mt: 5 }}
            >
              {id === "new"
                ? "Créer le compte rendu"
                : "Modifier le compte rendu"}
            </Button>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={alert.open}
            autoHideDuration={2000}
            onClose={() => setAlert({ ...alert, open: false })}
            TransitionComponent={Slide}
          >
            <Alert severity={alert.severity} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Container>
      </Container>
    )
  );
}

export default CreateReport;
