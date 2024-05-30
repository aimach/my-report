import Joi from "joi";

const dataValidation = {
  article: async (req, res, next) => {
    const articleSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.base": "Le nom doit être une chaîne de caractères",
        "any.required": "Le champ nom ne peut être vide",
      }),
      price: Joi.number().min(0).required().messages({
        "number.base": "Le prix doit être un nombre",
        "number.positive": "Le prix ne peut pas être négatif",
        "any.required": "Le champ prix ne peut être vide",
      }),
    });
    const schemaValidation = articleSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },

  register: async (req, res, next) => {
    const registerSchema = Joi.object({
      firstname: Joi.string().required().messages({
        "string.base": "Le prénom doit être une chaîne de caractères",
        "any.required": "Le champ prénom ne peut être vide",
      }),
      lastname: Joi.string().required().messages({
        "string.base": "Le nom doit être une chaîne de caractères",
        "any.required": "Le champ nom ne peut être vide",
      }),
      mail: Joi.string().email().required().messages({
        "string.base": "Le mail doit être une chaîne de caractères",
        "string.email": "Le champ doit être de type email",
        "any.required": "Le champ mail ne peut être vide",
      }),
      password: Joi.string().required().messages({
        "string.base": "Le mot de passe doit être une chaîne de caractères",
        "any.required": "Le champ mot de passe ne peut être vide",
      }),
      is_director: Joi.boolean().required().messages({
        "boolean.base": "Le champ is_director doit être un booléen",
        "any.required": "Le champ is_director ne peut être vide",
      }),
    });
    const schemaValidation = registerSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },

  login: async (req, res, next) => {
    const registerSchema = Joi.object({
      mail: Joi.string().email().required().messages({
        "string.base": "Le mail doit être une chaîne de caractères",
        "string.email": "Le champ doit être de type email",
        "string.empty": "Le champ mail ne peut être vide",
        "any.required": "Le champ mail ne peut être vide",
      }),
      password: Joi.string().required().messages({
        "string.base": "Le mot de passe doit être une chaîne de caractères",
        "string.empty": "Le champ mot de passe ne peut être vide",
        "any.required": "Le champ mot de passe ne peut être vide",
      }),
    });
    const schemaValidation = registerSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },

  client: async (req, res, next) => {
    const clientSchema = Joi.object({
      firstname: Joi.string().required().messages({
        "string.base": "Le prénom doit être une chaîne de caractères",
        "any.required": "Le champ prénom ne peut être vide",
      }),
      lastname: Joi.string().required().messages({
        "string.base": "Le nom doit être une chaîne de caractères",
        "any.required": "Le champ nom ne peut être vide",
      }),
      address: Joi.string().required().messages({
        "string.base": "L'adresse doit être une chaîne de caractères",
        "any.required": "Le champ adresse ne peut être vide",
      }),
      phone: Joi.string().required().messages({
        "string.base": "Le téléphone doit être une chaîne de caractères",
        "any.required": "Le champ téléphone ne peut être vide",
      }),
      mail: Joi.string().email().required().messages({
        "string.base": "Le mail doit être une chaîne de caractères",
        "string.email": "Le champ doit être de type email",
        "any.required": "Le champ mail ne peut être vide",
      }),
    });
    const schemaValidation = clientSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },

  commercial: async (req, res, next) => {
    const commercialSchema = Joi.object({
      firstname: Joi.string().required().messages({
        "string.base": "Le prénom doit être une chaîne de caractères",
        "any.required": "Le champ prénom ne peut être vide",
      }),
      lastname: Joi.string().required().messages({
        "string.base": "Le nom doit être une chaîne de caractères",
        "any.required": "Le champ nom ne peut être vide",
      }),
      mail: Joi.string().email().required().messages({
        "string.base": "Le mail doit être une chaîne de caractères",
        "string.email": "Le champ doit être de type email",
        "any.required": "Le champ mail ne peut être vide",
      }),
      password: Joi.string().messages({
        "string.base": "Le mot de passe doit être une chaîne de caractères",
        "any.required": "Le champ mot de passe ne peut être vide",
      }),
      is_director: Joi.boolean().required().messages({
        "boolean.base": "Le champ is_director doit être un booléen",
        "any.required": "Le champ is_director ne peut être vide",
      }),
    });
    const schemaValidation = commercialSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },

  visit: async (req, res, next) => {
    const visitSchema = Joi.object({
      _id: Joi.string().messages({
        "string.base": "Le champ id doit être une chaîne de caractères",
      }),
      __v: Joi.number().messages({
        "string.number": "Le champ __v doit être un nombre",
      }),
      commercial: Joi.string().messages({
        "string.base": "Le champ commercial doit être une chaîne de caractères",
      }),
      client: Joi.string().messages({
        "string.base": "Le champ client doit être une chaîne de caractères",
        "any.required": "Le champ client ne peut être vide",
      }),
      date: Joi.string().required().messages({
        "string.base": "Le mail doit être une chaîne de caractères",
        "any.required": "Le champ mail ne peut être vide",
      }),
      report_content: Joi.string().allow(null, "").messages({
        "string.base":
          "Le champ report_content doit être une chaîne de caractères",
        "any.required": "Le champ report_content ne peut être vide",
      }),
      article: Joi.string().required().messages({
        "string.base":
          "Le champ report_content doit être une chaîne de caractères",
        "any.required": "Le champ report_content ne peut être vide",
      }),
      article_nb: Joi.number().min(0).required().messages({
        "number.base": "Le champ article_nb doit être un nombre",
        "number.positive": "Le champ article_nb ne peut pas être négatif",
        "any.required": "Le champ article_nb ne peut être vide",
      }),
      sales: Joi.number().min(0).required().messages({
        "number.base": "Le champ sales doit être un nombre",
        "number.positive": "Le champ sales ne peut pas être négatif",
        "any.required": "Le champ sales ne peut être vide",
      }),
      forecast_nb: Joi.number().min(0).required().messages({
        "number.base": "Le champ forecast_nb doit être un nombre",
        "number.positive": "Le champ forecast_nb ne peut pas être négatif",
        "any.required": "Le champ forecast_nb ne peut être vide",
      }),
      forecast_sales: Joi.number().min(0).required().messages({
        "number.base": "Le champ forecast_sales doit être un nombre",
        "number.positive": "Le champ forecast_sales ne peut pas être négatif",
        "any.required": "Le champ forecast_sales ne peut être vide",
      }),
    });
    const schemaValidation = visitSchema.validate(req.body);
    if (schemaValidation.error) {
      const errorMessage = schemaValidation.error.details[0].message;
      res.status(400).json({ erreur: errorMessage });
    } else {
      next();
    }
  },
};

export default dataValidation;
