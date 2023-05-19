import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import caserouter from "./routes/caseroute.js";
import bookingrouter from "./routes/bookingroute.js";
import reportRouter from "./routes/reportroute.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("mediassist");
});
app.use("/user", userRoutes);
app.use("/case", caserouter);
app.use("/booking", bookingrouter);
app.use("/report", reportRouter);

const DATABASE_URL = process.env.CONNECTION_URL;
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
