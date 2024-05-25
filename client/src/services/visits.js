import connexion from "./connexion";

const getAllVisitsWithCommercialId = async (sortType, direction) => {
  try {
    let url = "/visits";
    if (sortType && direction)
      url += `?sort=${sortType}&direction=${direction}`;
    const response = await connexion.get(url);
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
