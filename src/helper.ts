import { Note } from "./notes/note.interface";
import fs from "fs";

const notesPath = `${__dirname}/notes.json`;

export const saveNotes = (obj: Note[]): void => {
  const jsonContent = JSON.stringify(obj);
  fs.writeFile(notesPath, jsonContent, "utf8", (err) => {
    if (err) {
      console.log("An error occured while saving notes.");
      throw err;
    }
  });
};

export const getNotes = (): Note[] => {
  return JSON.parse(fs.readFileSync(notesPath).toString());
};

export const generateNewId = (notes: Note[]): number => {
  if (notes.length === 0) {
    return 1;
  }
  return Math.max(...notes.map((x) => x.id)) + 1;
};
