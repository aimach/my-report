import connexion from "./connexion";

const getAllArticles = async () => {
  try {
    let url = "/articles";
    const response = await connexion.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getAllArticles };
