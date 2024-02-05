import { Request, Response, response } from "express";
import { StatusCodes } from "http-status-codes";
import { Note } from "./note.interface";
import { getNotes, generateNewId, saveNotes } from "../helper";

const { OK, CREATED, ACCEPTED, NOT_FOUND } = StatusCodes;

const create = (req: Request, res: Response) => {
  const notes = getNotes();
  const newId = generateNewId(notes);

  const newNote: Note = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  saveNotes(notes);

  return res.status(CREATED).json({
    message: `Successfully created note id ${newId}`,
    code: CREATED,
  });
};

const getAll = (req: Request, res: Response) => {
  const notes = getNotes();
  return res.status(OK).json({
    data: {
      notes,
      count: notes.length,
    },
  });
};

const getOne = (req: Request, res: Response) => {
  const { id } = req.params;
  const notes = getNotes();
  const note = notes.find((x) => x.id === +id);

  if (!note) {
    return res.status(NOT_FOUND).json({
      message: `Note with id ${id} not found`,
      code: NOT_FOUND,
    });
  }

  return res.status(OK).json({
    data: {
      note,
    },
  });
};

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const notes = getNotes();
  const note = notes.find((x) => x.id === +id);

  if (!note) {
    return res.status(NOT_FOUND).json({
      message: `Note with id ${id} not found`,
      code: NOT_FOUND,
    });
  }

  note.content = req.body.content;
  note.title = req.body.title;
  saveNotes(notes);

  return res.status(OK).json({
    code: OK,
    message: "Successfully updated",
  });
};

const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const notes = getNotes();
  const note = notes.find((x) => x.id === +id);

  if (!note) {
    return res.status(NOT_FOUND).json({
      message: `Note with id ${id} not found`,
      code: NOT_FOUND,
    });
  }

  notes.splice(notes.indexOf(note), 1);
  saveNotes(notes);

  return res.status(ACCEPTED).json({
    code: ACCEPTED,
    message: "Successfully deleted",
  });
};

const notesController = {
  create,
  getAll,
  getOne,
  update,
  remove,
};

export default notesController;
