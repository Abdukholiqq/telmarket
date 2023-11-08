import express from "express";
import router from "./modules/index.router";
import fileUpload from "express-fileupload";
import { resolve } from "path";
import cors from "cors";
import { Request, Response } from "express";
// import { ProductModel } from "./modules/relation";

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(express.static(resolve("src", "uploads")));
app.use(cors());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/api", router);
 

app.listen(PORT, () =>
  console.log(`server running  on ${PORT}, url: http://localhost:${PORT}`)
);
