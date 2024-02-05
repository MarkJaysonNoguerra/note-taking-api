import express from "express";
import cors from "cors";
import helmet from "helmet";
import { notesRouter } from "./notes/notes.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/notes", notesRouter);

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
