import jwt from "jsonwebtoken";

const checkCredentials = (req, res, next) => {
  if (req.cookies.auth) {
    // si le cookie "auth existe bien"
    const decode = jwt.verify(req.cookies.auth, process.env.JWT_KEY); // on décode le JWT
    if (decode.commercialId) {
      req.user = { commercialId: decode.commercialId, status: decode.status }; // on stocke dans la requête un objet "user" avec les informations du JWT
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

export default checkCredentials;
