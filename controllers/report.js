import jwt from "jsonwebtoken";
import cases from "../models/casemodel.js";
import reports from "../models/reportmodel.js";
export const reportData = async (req, res) => {
  const { email, report, hospname, hospemail } = req.body;
  console.log(req.body);
  try {
    const reportSheet = await reports.create({
      email,
      reportedData: report,

      hospName: hospname,
      hospemail: hospemail,
    });
    const token = jwt.sign(
      { email: reportSheet.email, id: reportSheet._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: reportSheet, token });
  } catch (error) {
    res.status(500).json("Something went wrong with report");
    console.log(error.message);
  }
};
export const reportedData = async (req, res) => {
  const { Memail } = req.body;
  console.log(req.body);
  const email = Memail;
  try {
    const records = await reports.find({ email });
    if (!records) {
      return res.status(404).json({ message: "record not Exists" });
    }
    const token = jwt.sign({ email: records.email, id: records._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: records, token });
  } catch (error) {
    res.status(500).json("Something went wrong with fetch record");
    console.log(error.message);
  }
};
