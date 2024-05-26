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

const getVisitById = async (visitId) => {
  try {
    const response = await connexion.get(`/visits/${visitId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createVisit = async (body) => {
  try {
    let url = "/visits";
    await connexion.post(url, body).then((res) => {
      if (res.data) return true;
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateVisit = async (body) => {
  try {
    let url = `/visits/${body._id}`;
    await connexion.put(url, body).then((res) => {
      if (res.data) return true;
    });
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

export {
  getAllVisitsWithCommercialId,
  getVisitById,
  createVisit,
  updateVisit,
  deleteVisit,
};
