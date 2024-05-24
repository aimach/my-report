import mongoose from "mongoose";

const visitSchema = mongoose.Schema({
  commercial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commercial",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  date: { type: Date, required: true },
  report_content: { type: String },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  article_nb: { type: Number, required: true },
  sales: { type: Number, require: true },
});

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
