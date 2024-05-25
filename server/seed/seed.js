import mongoose from "mongoose";
import { faker } from "@faker-js/faker/locale/fr";
import { hash } from "bcrypt";
import Article from "../models/article.js";
import Client from "../models/client.js";
import Commercial from "../models/commercial.js";
import Visit from "../models/visit.js";

const uri = process.env.ATLAS_URI || "";
const articleNb = 10;
const clientNb = 10;
const commercialNb = 5;
const visitNb = 100;

const generateArticles = (num) => {
  const articles = [];

  while (articles.length < num) {
    const name = faker.commerce.product();
    const price = faker.commerce.price({ min: 20, max: 200 });
    // la condition suivante permet d'éviter d'avoir des doublons dans le tableau
    if (articles.filter((article) => article.name === name).length === 0) {
      articles.push({ name, price });
    }
  }
  return articles;
};

const generateClients = (num) => {
  const clients = [];

  while (clients.length < num) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const address = `${faker.location.streetAddress()} ${faker.location.zipCode()} ${faker.location.city()}`;
    const phone = faker.phone.number();
    const mail = faker.internet.email({ firstname, lastname });
    // la condition suivante permet d'éviter d'avoir des doublons dans le tableau
    if (clients.filter((client) => client.mail === mail).length === 0) {
      clients.push({ firstname, lastname, address, phone, mail });
    }
  }
  return clients;
};

const generateCommercials = async (num) => {
  const commercials = [];

  while (commercials.length < num) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const mail = faker.internet.email({
      firstName: firstname,
      lastName: lastname,
      provider: "my-report.fr",
    });
    const password = await hash(firstname + lastname, 10);
    const is_director = commercials.length === 0; // un seul sera directeur commercial
    // la condition suivante permet d'éviter d'avoir des doublons dans le tableau
    if (
      commercials.filter((commercial) => commercial.mail === mail).length === 0
    ) {
      commercials.push({ firstname, lastname, mail, password, is_director });
    }
  }
  return commercials;
};

const generateVisits = async (num, articles, clients, commercials) => {
  const visits = [];

  while (visits.length < num) {
    const commercial =
      commercials[faker.number.int({ min: 0, max: commercialNb - 1 })];
    const client = clients[faker.number.int({ min: 0, max: clientNb - 1 })];
    const date = faker.date.anytime();
    const report_content = faker.lorem.text();
    const article = articles[faker.number.int({ min: 0, max: articleNb - 1 })];
    const article_nb = faker.number.int({ min: 5, max: 100 });
    const sales = article.price * article_nb;
    visits.push({
      commercial,
      client,
      date,
      report_content,
      article,
      article_nb,
      sales,
    });
  }
  return visits;
};

const seed = async () => {
  const articles = generateArticles(articleNb);
  const clients = generateClients(clientNb);
  const commercials = await generateCommercials(commercialNb);
  try {
    await Article.insertMany(articles);
    await Client.insertMany(clients);
    await Commercial.insertMany(commercials);

    // une fois insérées, récupération des données pour pouvoir sélectionner un élément random et l'insérer dans la visite
    const allArticles = await Article.find();
    const allClients = await Client.find();
    const allCommercials = await Commercial.find();
    const visits = await generateVisits(
      visitNb,
      allArticles,
      allClients,
      allCommercials
    );
    await Visit.insertMany(visits);
    console.log("Les données ont été insérées dans la BDD");
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
};

mongoose
  .connect(uri)
  .then(() => {
    mongoose.connection.db.dropDatabase();
    seed();
  })
  .catch((error) => console.log(error));
