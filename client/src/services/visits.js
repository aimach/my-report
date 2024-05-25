import connexion from "./connexion";

const getAllVisitsWithCommercialId = async () => {
  try {
    const response = await connexion.get("/visits");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getAllVisitsWithCommercialId };
