import connexion from "./connexion";

const getAllVisitsWithCommercialId = async (
  resultNb,
  currentPage,
  sortType,
  direction
) => {
  try {
    let url = `/visits?resultNb=${resultNb}&currentPage=${currentPage}`;
    if (sortType && direction)
      url += `&sort=${sortType}&direction=${direction}`;
    const response = await connexion.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getVisitById = async (visitId) => {
  try {
    const response = await connexion.get(`/visits/${visitId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createVisit = async (body, forecast) => {
  try {
    let url = "/visits";
    await connexion.post(url, body);
    if (forecast.date > new Date() && forecast.article_nb !== 0) {
      await connexion.post(url, forecast);
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateVisit = async (body) => {
  try {
    let url = `/visits/${body._id}`;
    const response = await connexion.put(url, body);
    if (response.data) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteVisit = async (visitId) => {
  try {
    const response = await connexion.delete(`/visits/${visitId}`);
    if (response.status === 200) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  getAllVisitsWithCommercialId,
  getVisitById,
  createVisit,
  updateVisit,
  deleteVisit,
};
