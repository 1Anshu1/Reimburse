import express from "express";
import morgan from "morgan";
import cors from "cors";

import { errorMiddleware, notFound } from "./middlewares/error.middleware.js";

import authRoute from "./routes/auth.routes.js";
import claimRoute from "./routes/claim.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/claim", claimRoute);

app.use(notFound);
app.use(errorMiddleware);

export default app;
