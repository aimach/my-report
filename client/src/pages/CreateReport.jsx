import { useState } from "react";
import { useLoaderData } from "react-router-dom";
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
  const [selectedClientId, setSelectedClientId] = useState(clients[0]._id);
  const [selectedArticleId, setSelectedArticleId] = useState(articles[0]._id);
  const [articleNb, setArticleNb] = useState(0);
  const [sales, setSales] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportContent, setReportContent] = useState("");

  const handleArticleNb = (articleNb) => {
    setArticleNb(articleNb);
    const [selectedArticle] = articles.filter(
      (article) => article._id === selectedArticleId
    );
    const totalPrice = selectedArticle.price * articleNb;
    setSales(totalPrice);
  };

  const submitVisitForm = async (event) => {
    event.preventDefault();
    const body = {
      client: selectedClientId,
      date: selectedDate,
      report_content: reportContent,
      article: selectedArticleId,
      article_nb: articleNb,
      sales,
    };
    const isCreated = await createVisit(body);
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
                  onChangeFunction={setSelectedClientId}
                  selectedItem={selectedClientId}
                />
                <DisplayClientInfo
                  client={
                    clients.filter(
                      (client) => client._id === selectedClientId
                    )[0]
                  }
                />
              </Item>
            </Grid>
            <Grid xs={4}>
              <Item>
                <DateSelect
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
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
                  onChange={(event) => setReportContent(event.target.value)}
                  value={reportContent}
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
                        onChangeFunction={setSelectedArticleId}
                        selectedItem={selectedArticleId}
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
                      value={articleNb}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      margin="normal"
                      id="sales"
                      label="Chiffre d'affaire"
                      name="sales"
                      autoFocus
                      value={`${sales} €`}
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
