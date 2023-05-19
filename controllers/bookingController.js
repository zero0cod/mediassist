import jwt from "jsonwebtoken";
import users from "../models/authmodel.js";
import bookings from "../models/bookingmodel.js";

export const bookData = async (req, res) => {
  const { data } = req.body;
  const { ambid, ambemail, email, number, lat, lng, status, name } = data[0];
  console.log(req.body);
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User not Exists" });
    }

    const booking = await bookings.create({
      ambid,
      ambemail,
      email,
      number,
      lat,
      lng,
      status,
      ambname: name,
    });
    const token = jwt.sign(
      { email: booking.email, id: booking.ambid },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: booking, token });
  } catch (error) {
    res.status(500).json("Something went wrong with booking");
    console.log(error.message);
  }
};
export const fetchData = async (req, res) => {
  const { Memail } = req.body;
  console.log(req.body);
  const ambemail = Memail;
  try {
    const booking = await bookings.findOne({ ambemail });
    if (!booking) {
      return res.status(404).json({ message: "record not Exists" });
    }
    const token = jwt.sign(
      { email: booking.ambemail, id: booking.ambid },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: booking, token });
  } catch (error) {
    res.status(500).json("Something went wrong with fetch record");
    console.log(error.message);
  }
};
