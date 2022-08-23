import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import UnicornNote from "../models/UnicornNote";

const unicornNotesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

unicornNotesRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<UnicornNote>("unicorn_notes").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

unicornNotesRouter.post("/", async (req, res) => {
  try {
    const newNote: UnicornNote = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<UnicornNote>("unicorn_notes")
      .insertOne(newNote);
    res.status(200).json(newNote);
  } catch (err) {
    errorResponse(err, res);
  }
});

unicornNotesRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<UnicornNote>("unicorn_notes")
      .deleteOne({ _id: new ObjectId(id) });
    result.deletedCount
      ? res.sendStatus(204)
      : res.status(404).send("Note not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

export default unicornNotesRouter;
