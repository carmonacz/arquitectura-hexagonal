import { Router } from "express";
import { ExpressTemaController } from "./ExpressTemaController";

const controller = new ExpressTemaController();

const ExpressTemaRouter = Router();

ExpressTemaRouter.get("/temas/", controller.getAll);
ExpressTemaRouter.get("/temas/:id/", controller.getOneById);
ExpressTemaRouter.post("/temas/", controller.create);
ExpressTemaRouter.put("/temas/:id", controller.edit);
ExpressTemaRouter.delete("/temas/:id/", controller.delete);

export { ExpressTemaRouter };
