import mongoose from "mongoose";

const commercialSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_director: { type: Boolean, required: true },
});

const Commercial = mongoose.model("Commercial", commercialSchema);
export default Commercial;
