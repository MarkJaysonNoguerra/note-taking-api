import express, { Express, Request, Response } from "express";
import notesController from "./notes.controller";
import notesValidation from "./notes.validation";

export const notesRouter = express.Router();

notesRouter.post("/", notesValidation.validBody, notesController.create);
notesRouter.get("/", notesController.getAll);

notesRouter.get("/:id", notesValidation.validId, notesController.getOne);

notesRouter.put(
  "/:id",
  notesValidation.validId,
  notesValidation.validBody,
  notesController.update
);

notesRouter.delete("/:id", notesValidation.validId, notesController.remove);
