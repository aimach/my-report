import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  mail: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
