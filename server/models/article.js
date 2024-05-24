import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
