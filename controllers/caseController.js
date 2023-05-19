import jwt from "jsonwebtoken";
import cases from "../models/casemodel.js";
import users from "../models/authmodel.js";

export const caseData = async (req, res) => {
  const { email, casedata, name, number, hospName, hospemail } = req.body;
  console.log(email);
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User not Exists" });
    }

    const caseSheet = await cases.create({
      email,
      caseData: casedata,
      name,
      number,
      hospName,
      hospemail,
    });
    const token = jwt.sign(
      { email: caseSheet.email, id: caseSheet._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: caseSheet, token });
  } catch (error) {
    res.status(500).json("Something went wrong with caseSheet");
    console.log(error.message);
  }
};
export const caseRecordData = async (req, res) => {
  const { Memail } = req.body;
  console.log(req.body);
  const hospemail = Memail;
  try {
    const records = await cases.find({ hospemail });
    if (!records) {
      return res.status(404).json({ message: "record not Exists" });
    }
    const token = jwt.sign(
      { email: records.hospemail, id: records._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: records, token });
  } catch (error) {
    res.status(500).json("Something went wrong with fetch record");
    console.log(error.message);
  }
};
