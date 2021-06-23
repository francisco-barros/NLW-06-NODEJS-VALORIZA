import "reflect-metadata";
import "express-async-errors";
import "./database";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import { HttpStatusCode } from "./protocols/http/httpProtocol";

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(HttpStatusCode.badRequest).json({
        error: err.message,
      });
    }
    return response.status(HttpStatusCode.serverError).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
