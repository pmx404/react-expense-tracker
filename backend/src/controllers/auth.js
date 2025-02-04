import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../util/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ userName, email, password: hashedPassword });
  try {
    await user.save();
    console.log('one');

    res.status(201).json({
      message: " User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log('user- ', validUser);


    if (!validUser) {
      return next(errorHandler("404", "user not found"));
    }


    const validPassword = bcrypt.compareSync(password, validUser.password);
    console.log('Valid Pass - ', validPassword);

    if (!validPassword) {
      return next(errorHandler("401", "invalid credential"));
    }

    // create jwt token for cookie
    const token = jwt.sign(
      { userId: validUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const { password: hashedPassword, ...userDto } = validUser._doc;

    console.log(token);


    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ user: userDto, token: token });
  } catch (error) {
    next(error);
  }
};
