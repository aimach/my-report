import connexion from "./connexion";

const getAllClients = async () => {
  try {
    let url = "/clients";
    const response = await connexion.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getAllClients };
