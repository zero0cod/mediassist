import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String },
  address: { type: String },
  blood: { type: String },
});

export default mongoose.model("users", userSchema);
