import connexion from "./connexion";

const getAllVisitsWithCommercialId = async () => {
  try {
    const response = await connexion.get("/visits");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteVisit = async (visitId) => {
  try {
    await connexion.delete(`/visits/${visitId}`);
  } catch (error) {
    console.error(error);
  }
};

export { getAllVisitsWithCommercialId, deleteVisit };
