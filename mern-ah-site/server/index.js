import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { handleError } from "./helper/response.js";
import mongodbConnect from "./config/db-config.js";
import ENV from "./config/env-config.js";
import videoRouter from "./router/video.js";
import idolRouter from "./router/idol.js";

mongodbConnect();
const app = express();

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(`/idol`, idolRouter);
app.use(`/video`, videoRouter);

// deploy
if (process.env.NODE_ENV === "production") {
  // set cookie public frontend

  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, `/client/dist`)));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use(handleError);
