import jwt from "jsonwebtoken";

const checkCredentials = (req, res, next) => {
  if (req.cookies.auth) {
    const decode = jwt.verify(req.cookies.auth, process.env.JWT_KEY);
    if (decode.commercialId) {
      req.user = { commercialId: decode.commercialId, status: decode.status };
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

export default checkCredentials;
