import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  ambid: { type: String, required: true },
  ambemail: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  status: { type: String, required: true },
  name: { type: String },
});

export default mongoose.model("bookings", bookingSchema);
