"use strict";
// import multer from "multer";
// import path from "path";
// import { Request } from "express";
// const storage = multer.diskStorage({
//   destination: function (req: Request, file: any, cb: any) {
//     const PATH = path.join(process.cwd(), "src", "uploads");
//     cb(null, PATH);
//   },
//   filename: function (req: Request, file: any, cb: any) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//     console.log(uniqueSuffix);
//   },
// });
// export const upload = multer({ storage: storage });
