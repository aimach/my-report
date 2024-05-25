import connexion from "./connexion";

const login = async (body, setConnected, setProfile) => {
  try {
    await connexion.post("/auth/login", body).then((res) => {
      setConnected(true);
      setProfile(res.data);
    });
    return true;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      console.error(error.response.data.erreur);
    } else {
      console.error(error);
    }
  }
};

const removeAuthCookie = async () => {
  try {
    await connexion.get(`/auth/logout`);
  } catch (err) {
    console.error(err);
  }
};

export { login, removeAuthCookie };
