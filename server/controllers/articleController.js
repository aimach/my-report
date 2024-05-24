import Article from "../models/article.js";

export const ArticleController = {
  getArticles: async (req, res) => {
    try {
      let articles = await Article.find().exec();
      if (!articles.length) {
        res.send("Pas d'articles").status(200);
      } else {
        res.send(articles).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getOneArticle: async (req, res) => {
    const { id } = req.params;
    try {
      let article = await Article.findById(id).exec();
      if (!article) {
        res.send("Article non trouvé").status(404);
      } else {
        res.send(article).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  createArticle: async (req, res) => {
    try {
      const newArticle = new Article(req.body);
      const savedArticle = await newArticle.save();
      res.status(201).send(savedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  updateArticle: async (req, res) => {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedArticle) {
        return res.status(404).json({ error: "Article non trouvé" });
      }
      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  deleteArticle: async (req, res) => {
    const { id } = req.params;
    try {
      let article = await Article.findById(id).exec();
      if (!article) {
        res.send("Cet article n'existe pas").status(404);
      } else {
        await Article.deleteOne({ _id: article.id });
        res.status(200).send("Article supprimé");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },
};
