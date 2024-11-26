import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { TemaNotFoundError } from "../dominio/TemaNotFoundError";

// Definir un tipo genérico para las funciones de los controladores
type ControllerHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export class ExpressTemaController {
  getAll: ControllerHandler = async (req, res, next) => {
    try {
      const temas = await ServiceContainer.tema.getAll.run();

      res.json(temas.map((tema) => tema.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  };

  getOneById: ControllerHandler = async (req, res, next) => {
    try {
      const tema = await ServiceContainer.tema.getOneById.run(req.params.id);

      res.json(tema.mapToPrimitives()).status(200);
    } catch (error) {
      if (error instanceof TemaNotFoundError) {
        res.status(404).json({ message: error.message });
      }

      next(error);
    }
  };

  create: ControllerHandler = async (req, res, next) => {
    try {
      const { id, nombre } = req.body as {
        id: string;
        nombre: string;
      };

      await ServiceContainer.tema.create.run(id, nombre);

      res.status(201).json({ message: "Tema creado correctamente" });
    } catch (error) {
      next(error);
    }
  };

  edit: ControllerHandler = async (req, res, next) => {
    try {
      const { nombre } = req.body as { nombre: string };

      await ServiceContainer.tema.edit.run(req.params.id, nombre);

      res.status(201).json({ message: "Tema editado correctamente" });
    } catch (error) {
      if (error instanceof TemaNotFoundError) {
        res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };

  delete: ControllerHandler = async (req, res, next) => {
    try {
      await ServiceContainer.tema.delete.run(req.params.id);

      res.status(201).json({ message: "Tema eliminado correctamente" });
    } catch (error) {
      if (error instanceof TemaNotFoundError) {
        res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };
}
