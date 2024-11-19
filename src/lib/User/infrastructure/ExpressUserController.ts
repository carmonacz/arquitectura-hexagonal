import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";

// Definir un tipo genérico para las funciones de los controladores
type ControllerHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export class ExpressUserController {
  getAll: ControllerHandler = async (req, res, next) => {
    try {
      const users = await ServiceContainer.user.getAll.run();

      res.json(users.map((user) => user.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  };

  getOneById: ControllerHandler = async (req, res, next) => {
    try {
      const user = await ServiceContainer.user.getOneById.run(req.params.id);

      res.json(user.mapToPrimitives()).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      }

      next(error);
    }
  };

  create: ControllerHandler = async (req, res, next) => {
    try {
      const { id, name, email, createdAt } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: string;
      };

      await ServiceContainer.user.create.run(id, name, email, new Date(createdAt));

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  edit: ControllerHandler = async (req, res, next) => {
    try {
      const { id, name, email, createdAt } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: string;
      };

      await ServiceContainer.user.edit.run(id, name, email, new Date(createdAt));

      res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };

  delete: ControllerHandler = async (req, res, next) => {
    try {
      await ServiceContainer.user.delete.run(req.params.id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };
}
