import express from "express";
import { getClient } from "../db";
import UnicornBuddies from "../models/UnicornBuddies";

const unicornBuddiesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

unicornBuddiesRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const cursor = client
      .db()
      .collection<UnicornBuddies>("unicorn_buddies")
      .find({ $or: [{ uid1: uid }, { uid2: uid }] });
    const result = await cursor.toArray();
    result
      ? res.status(200).json(result)
      : res.status(404).json("uid not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

unicornBuddiesRouter.post("/", async (req, res) => {
  try {
    const newBuddy: UnicornBuddies = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<UnicornBuddies>("unicorn_buddies")
      .insertOne(newBuddy);
    res.status(200).json(newBuddy);
  } catch (err) {
    errorResponse(err, res);
  }
});

unicornBuddiesRouter.put("/:uid/:uid2", async (req, res) => {
  try {
    const uid1: string = req.params.uid;
    const uid2: string = req.params.uid2;
    const client = await getClient();
    const result = await client
      .db()
      .collection<UnicornBuddies>("unicorn_buddies")
      .updateOne({ uid1, uid2 }, { $set: { accepted: true } });
    res.status(200).json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

unicornBuddiesRouter.delete("/:uid/:uid2", async (req, res) => {
  try {
    const uid1: string = req.params.uid;
    const uid2: string = req.params.uid2;
    const client = await getClient();
    await client
      .db()
      .collection<UnicornBuddies>("unicorn_buddies")
      .deleteOne({ uid1, uid2 });
    res.status(204);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default unicornBuddiesRouter;
