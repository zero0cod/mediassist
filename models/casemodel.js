import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
  email: { type: String, required: true },
  caseData: { type: String, required: true },
  number: { type: String, required: true },
  name: { type: String },
  hospName: { type: String, required: true },
  hospemail: { type: String, required: true },
});

export default mongoose.model("cases", caseSchema);
