import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { createVisit, updateVisit } from "../services/visits";
import connexion from "../services/connexion";
import SelectInput from "../components/SelectInput";
import DisplayClientInfo from "../components/DisplayClientInfo";
import DateSelect from "../components/DatePicker";
import SnackBarComponent from "../components/SnackBarComponent";
import { Typography, Container, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PaperComponent from "../components/PaperComponent";

function ReportPage() {
  const { clients, articles } = useLoaderData();
  const { id, action } = useParams();
  const [visit, setVisit] = useState(null);
  const [forecastDate, setForecastDate] = useState(new Date());
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
        forecast_nb: 0,
        forecast_sales: 0,
      };
      setVisit(newVisit); // on set la visite à vide
    } else {
      // sinon on récupère les informations de la visite
      const getVisitById = async (visitId) => {
        try {
          const response = await connexion.get(`/visits/${visitId}`);
          setVisit(response.data); // on set la visite avec les données de la BDD
        } catch (error) {
          console.error(error);
        }
      };
      getVisitById(id);
    }
  }, [articles, clients, id]);

  const handleArticleNb = (articleNb, fieldType) => {
    const [selectedArticle] = articles.filter(
      // on récupère les infos de l'article sélectionné
      (article) => article._id === visit.article
    );
    const totalPrice = selectedArticle.price * articleNb; // on calcule le montant total en fonction du nombre et du prix
    if (fieldType === "current") {
      // si c'est l'input de la visite en cours, on met à jour les champs article_nb et sales
      setVisit({ ...visit, article_nb: articleNb, sales: totalPrice });
    } else if (fieldType === "forecast") {
      setVisit({
        // si c'est l'input de la future visite, on met à jour les champs article_nb et sales
        ...visit,
        forecast_nb: articleNb,
        forecast_sales: totalPrice,
      });
    }
  };

  const submitVisitForm = async (event) => {
    event.preventDefault();
    const forecast = {
      // on créé un body avec le prévisionnel pour la création d'une nouvelle visite
      ...visit, // client et articles restent les mêmes
      date: forecastDate, // date prévisionnelle choisie
      report_content: "", // le compte rendu est vide
      article_nb: visit.forecast_nb, // le nombre d'articles sera le prévisionnel de la visite en cours
      sales: visit.forecast_sales, // le montant sera le prévisionnel de la visite en cours
      forecast_nb: 0, // il n'y a pas encore de prévisionnel
      forecast_sales: 0, // il n'y a pas encore de prévisionnel
    };
    const isCreatedOrUpdated =
      id === "new"
        ? await createVisit(visit, forecast) // si c'est une page de Création de CR, on créé une visite
        : await updateVisit(visit); // si c'est une page de Modification de CR, on met à jour la visite
    if (isCreatedOrUpdated) {
      // si les fonctions on renvoyé "true" (la requête a fonctionné)
      setAlert({ ...alert, open: true }); // on affiche une alerte
      setTimeout(() => {
        // on revient à la page d'accueil
        navigate("/");
      }, 2000); // 2s
    } else {
      // si ça n'a pas fonctionné, on affiche une alerte d'erreur
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
        {action !== "see" && ( // si c'est une création ou modification, on affiche un titre
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
            {id === "new"
              ? "Créer un compte rendu"
              : "Modifier un compte rendu"}
          </Typography>
        )}

        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1 }} component="form" onSubmit={submitVisitForm}>
            <Grid container spacing={2}>
              <Grid xs={7.5}>
                <PaperComponent height="370px">
                  <SelectInput
                    label="Client rencontré"
                    list={clients}
                    type="client"
                    visit={visit}
                    onChangeFunction={setVisit}
                    selectedItem={visit.client}
                    action={action}
                  />
                  <DisplayClientInfo
                    client={
                      clients.filter((client) => client._id === visit.client)[0]
                    }
                  />
                </PaperComponent>
              </Grid>
              <Grid xs={4.5}>
                <PaperComponent height="370px">
                  <DateSelect
                    selectedDate={visit.date}
                    visit={visit}
                    setVisit={setVisit}
                    action={action}
                  />
                </PaperComponent>
              </Grid>
              <Grid xs={12}>
                <PaperComponent height="">
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
                    disabled={action === "see"}
                  />
                </PaperComponent>
              </Grid>
              <Grid xs={12}>
                <PaperComponent height="">
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
                        action={action}
                      />
                    </Grid>
                    <Grid xs={4}>
                      <TextField
                        margin="normal"
                        id="articleNb"
                        label="Nombre d'articles"
                        name="articleNb"
                        onChange={(event) =>
                          handleArticleNb(event.target.value, "current")
                        }
                        value={visit.article_nb}
                        sx={{
                          textAlign: "right",
                          width: "100%",
                        }}
                        required
                        disabled={action === "see"}
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
                        disabled={action === "see"}
                      />
                    </Grid>
                  </Grid>
                </PaperComponent>
              </Grid>
              <Grid xs={12}>
                <PaperComponent height="">
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    {action === "new" ? "Prochaine visite" : "Prévisionnel"}
                  </Typography>
                  {action === "new" && (
                    <Typography component="body2">
                      Si tous les champs sont complétés, un nouveau compte-rendu
                      sera créé
                    </Typography>
                  )}

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={4}>
                      <DatePicker
                        label="Date de la prochaine visite"
                        disablePast
                        value={forecastDate}
                        onChange={(newDate) => setForecastDate(newDate)}
                        disabled={action === "modify"}
                      />
                    </Grid>
                    <Grid xs={4}>
                      <TextField
                        margin="normal"
                        id="forecastNb"
                        label="Nombre d'articles prévisionnel"
                        name="forecastNb"
                        onChange={(event) =>
                          handleArticleNb(event.target.value, "forecast")
                        }
                        value={visit.forecast_nb}
                        sx={{
                          textAlign: "right",
                          width: "100%",
                        }}
                        required
                        disabled={action !== "new"}
                      />
                    </Grid>
                    <Grid xs={4}>
                      <TextField
                        margin="normal"
                        id="forecastSales"
                        label="Chiffre d'affaire prévisionnel"
                        name="forecastSales"
                        value={`${visit.forecast_sales} €`}
                        sx={{
                          width: "100%",
                        }}
                        required
                        disabled={action !== "new"}
                      />
                    </Grid>
                  </Grid>
                </PaperComponent>
              </Grid>
            </Grid>
            {action !== "see" && (
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
            )}
          </Box>
          <SnackBarComponent alert={alert} setAlert={setAlert} />
        </Container>
      </Container>
    )
  );
}

export default ReportPage;
