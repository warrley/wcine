import "dotenv/config";
import express from "express";
import { mainRouter } from "./routes/mainRouter";
import { authRouter } from "./routes/authRouter";

const app = express();
app.use(express.json())

app.use("/api", mainRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server online at " + port + " port");
});