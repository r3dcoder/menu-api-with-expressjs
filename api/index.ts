// import { Request, Response } from "express";

// export default async (req: Request, res: Response) => {
//   res.json({ message: "Hello guys. Welcome to Vercel" });
// };




/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import { itemsRouter } from "./items/items.router";
 import { usersRouter } from "./users/users.router";
 import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { fileUploadRouter } from "./file-upload/file-upload.router";
 
 dotenv.config();
/**
 * App Variables
 */
 console.log('server start....')

//  if (!process.env.PORT) {
//    console.log(`Listening on port  ${process.env.PORT} `);

//     process.exit(1);

//  }
 
 const PORT: number = parseInt(process.env.PORT as string, 10)||7000;
 console.log(`Listening on port ${PORT}`);

 const app = express();

/**
 *  App Configuration
 */

 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 app.use("/api/menu/items", itemsRouter);
 app.use("/menu/users", usersRouter);
 app.use("/menu/file-upload", fileUploadRouter);
 app.use(errorHandler);
 app.use(notFoundHandler)
/**
 * Server Activation
 */
 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}}`);
  });