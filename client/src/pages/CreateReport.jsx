import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import SelectInput from "../components/SelectInput";
import DisplayClientInfo from "../components/DisplayClientInfo";
import DateSelect from "../components/DatePicker";
import { Typography, Container, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import { createVisit } from "../services/visits";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function CreateReport() {
  const { clients, articles } = useLoaderData();
  const { id } = useParams();
  let visitBody = {};
  if (id === "new") {
    // si c'et une creation de compte rendu
    visitBody = {
      client: clients[0]._id,
      date: new Date(),
      report_content: "",
      article: articles[0]._id,
      article_nb: 0,
      sales: 0,
    };
  }

  const [visit, setVisit] = useState(visitBody);

  const handleArticleNb = (articleNb) => {
    const [selectedArticle] = articles.filter(
      (article) => article._id === visit.article
    );
    const totalPrice = selectedArticle.price * articleNb;
    setVisit({ ...visit, article_nb: articleNb, sales: totalPrice });
  };

  const submitVisitForm = async (event) => {
    event.preventDefault();
    const isCreated = await createVisit(visit);
    if (isCreated) {
      console.log("ça a bien été créé !");
    }
  };

  return (
    <div>
      <Typography variant="h4" color="text.primary">
        Créer un compte rendu
      </Typography>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Item>
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
              </Item>
            </Grid>
            <Grid xs={4}>
              <Item>
                <DateSelect
                  selectedDate={visit.date}
                  visit={visit}
                  setVisit={setVisit}
                />
              </Item>
            </Grid>
            <Grid xs={12}>
              <Item>
                <Typography variant="h6">Compte rendu</Typography>
                <TextField
                  margin="normal"
                  id="reportContent"
                  name="reportContent"
                  label="Compte-rendu"
                  autoFocus
                  fullWidth
                  multiline
                  minRows={10}
                  onChange={(event) =>
                    setVisit({ ...visit, report_content: event.target.value })
                  }
                  value={visit.reportContent}
                />
              </Item>
            </Grid>
            <Grid xs={12}>
              <Item>
                <Typography variant="h6">Articles</Typography>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                      <SelectInput
                        label="Articles"
                        list={articles}
                        type="article"
                        visit={visit}
                        onChangeFunction={setVisit}
                        selectedItem={visit.article}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      margin="normal"
                      id="articleNb"
                      label="Nombre d'articles"
                      name="articleNb"
                      autoFocus
                      onChange={(event) => handleArticleNb(event.target.value)}
                      value={visit.article_nb}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      margin="normal"
                      id="sales"
                      label="Chiffre d'affaire"
                      name="sales"
                      autoFocus
                      value={`${visit.sales} €`}
                    />
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Button variant="contained" onClick={submitVisitForm}>
          Créer le compte rendu
        </Button>
      </Container>
    </div>
  );
}

export default CreateReport;
