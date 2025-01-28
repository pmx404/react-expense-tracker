import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import expenseRouter from "./routes/expsenseRouter.js";
import cors from 'cors'

dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECT_STRING)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("not connected and got error", err);
  });

const app = express();
app.use(cors())
app.use(express.json());

app.listen(5000, () => {
  console.log("server starting at port 5000");
});


app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use('/api/expense', expenseRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: "false",
    statusCode,
    message: errorMessage,
  });
});
