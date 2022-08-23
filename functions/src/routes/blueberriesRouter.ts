import express from "express";
import { getClient } from "../db";
import Blueberry from "../models/Blueberry";

const blueberriesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

blueberriesRouter.get("/:id/", async (req, res) => {
  try {
    const notesId: string = req.params.id;
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Blueberry>("blueberries")
      .find({ notesId });
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

blueberriesRouter.post("/", async (req, res) => {
  try {
    const blueberry: Blueberry = req.body;
    const client = await getClient();
    await client.db().collection<Blueberry>("blueberries").insertOne(blueberry);
    res.status(200).json(blueberry);
  } catch (err) {
    errorResponse(err, res);
  }
});

blueberriesRouter.delete("/:id/user/:uid", async (req, res) => {
  try {
    const notesId: string = req.params.id;
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Blueberry>("blueberries")
      .deleteOne({ notesId, uid });
    result.deletedCount
      ? res.sendStatus(204)
      : res.status(404).send("Blueberry not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

export default blueberriesRouter;
