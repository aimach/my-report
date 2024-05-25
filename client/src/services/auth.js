import connexion from "./connexion";

const login = async (body, connected, setConnected, profile, setProfile) => {
  try {
    await connexion.post("/auth/login", body).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      }
      setConnected(true);
      setProfile(res.data);
    });
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      console.error(error.response.data.erreur);
    } else {
      console.error(error);
    }
  }
};

export { login };
