import connexion from "./connexion";

const login = async (body) => {
  try {
    await connexion.post("/auth/login", body).then((res) => console.log(res));
  } catch (error) {
    console.error(error);
  }
};

export { login };
