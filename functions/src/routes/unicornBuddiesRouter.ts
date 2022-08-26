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

export default unicornBuddiesRouter;
