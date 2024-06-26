import Commercial from "../models/commercial.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthController = {
  register: async (req, res) => {
    try {
      const hashedPassword = await hash(req.body.password, 10); // on hash le mot de passe
      const newCommercial = new Commercial({
        ...req.body,
        password: hashedPassword, // on stocke le mdp hashé dans le body
      });
      await newCommercial.save();
      res.status(201).send("Nouveau commercial enregistré !");
    } catch (error) {
      if (error.code === 11000) {
        console.log(error);
        // si c'est le code erreur de duplicateKey
        res.status(400).send("Cet email existe déjà");
      } else {
        console.error(error);
        res.status(500).send("Erreur serveur");
      }
    }
  },

  login: async (req, res) => {
    const { mail, password } = req.body;
    const jwtKey = process.env.JWT_KEY;

    try {
      // on recherche le commercial à l'aide du mail
      const commercial = await Commercial.findOne({ mail });
      // s'il n'existe pas, on renvoie un message d'erreur
      if (!commercial) {
        res.send("Commercial non trouvé").status(404);
      }
      // on vérifie la correspondance des mots de passe
      const passwordMatch = await compare(password, commercial.password);
      // s'ils ne correspondent pas, on renvoie un message d'erreur
      if (!passwordMatch) {
        return res.status(401).send("Connexion non authorisée");
      }
      // génération du token
      const token = jwt.sign(
        { commercialId: commercial._id, status: commercial.is_director },
        jwtKey,
        {
          expiresIn: "24h",
        }
      );
      // stockage du token dans les cookies de la requête
      res.cookie("auth", token, { httpOnly: true }).status(200).json({
        id: commercial._id,
        mail: commercial.mail,
        is_director: commercial.is_director,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getProfile: async (req, res) => {
    const commercial = await Commercial.findOne({
      _id: req.user.commercialId, // ici on utilise l'id de l'utilisateur qui était dans le JWT (et transformé en req.user)
    }).select("-password");
    if (commercial) {
      res.status(200).send(commercial);
    } else {
      res.sendStatus(403);
    }
  },

  logout: async (req, res) => {
    res.clearCookie("auth");
    if (req.cookies.auth) {
      // si la suppression ne fonctionne pas
      res.status(500).send("Erreur serveur");
    } else {
      res.sendStatus(200);
    }
  },
};
