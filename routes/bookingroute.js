import express from "express";
import { fetchData, bookData } from "../controllers/bookingController.js";

const bookingrouter = express.Router();

bookingrouter.post("/startbooking", bookData);
bookingrouter.post("/fetch", fetchData);
export default bookingrouter;
