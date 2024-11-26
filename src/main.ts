import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";
import { ExpressTemaRouter } from "./lib/Temas/infraestructure/ExpressTemaRouter";

const app = express();

app.use(express.json());

app.use(ExpressUserRouter);
app.use(ExpressTemaRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
