import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  email: { type: String, required: true },
  reportedData: { type: String, required: true },
  number: { type: String },
  hospName: { type: String, required: true },
  hospemail: { type: String, required: true },
});

export default mongoose.model("reports", reportSchema);
