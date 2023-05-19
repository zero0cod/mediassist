import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/authmodel.js";

export const signup = async (req, res) => {
  const { number, email, password, radio } = req.body;
  console.log(req.body);
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      number,
      email,
      password: hashedPassword,
      category: radio,
      name: "",
      blood: "",
      address: "",
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong with signup");
    console.log(error.message);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });

    if (!existinguser) {
      return res.status(404).json({ message: "User don't exist" });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existinguser.email,
        id: existinguser._id,
        category: existinguser.category,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("something wnet wrong...");
    console.log(error.message);
  }
};
export const update = async (req, res) => {
  const { id, address, blood, name, number, email } = req.body;
  try {
    console.log(id + "update");

    var data = {
      $set: { number: number },
    };
    const updatedUser = await users.updateMany(
      { email: email },
      {
        $set: { number: number },
      }
    );
    console.log(updatedUser._id + "user update");

    res.status(200).json({ result: updatedUser });
  } catch (error) {
    res.status(500).json("Something went wrong with update");
    console.log(error.message);
  }
};
