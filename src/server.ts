import express from "express";
import router from "./modules/index.router";
import 'dotenv/config'; 
import fileUpload from "express-fileupload";
import { resolve } from "path";
import cors from "cors";
import { Request, Response } from "express"; 
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'  
import { bootstrap } from "./db/config";
 
const app = express();
app.use(express.json());
app.use(express.static(resolve("src", "uploads")));
app.use(cors()); 
bootstrap()
const PORT =  process.env.SERVER_PORT;
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
); 
app.use("/api", router);
app.post('/pets',(req:Request, res:Response)=>{
  console.log(req, "req");
  
  console.log(req.body, "pet body");
  res.send(req.body)
})
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) 

app.listen(PORT, () =>
  console.log(`server running  on ${PORT}, url: http://localhost:${PORT}`)
);
