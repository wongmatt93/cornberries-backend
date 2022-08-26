import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import UserProfile from "../models/UserProfile";

const userProfilesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

userProfilesRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<UserProfile>("user_profiles").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfilesRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = client
      .db()
      .collection<UserProfile>("user_profiles")
      .findOne({ uid: id });
    result
      ? res.status(200).json(result)
      : res.status(404).json("Id not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfilesRouter.post("/", async (req, res) => {
  try {
    const newProfile: UserProfile = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .insertOne(newProfile);
    res.status(200).json(newProfile);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfilesRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<UserProfile>("user_profiles")
      .deleteOne({ _id: new ObjectId(id) });
    result.deletedCount
      ? res.sendStatus(204)
      : res.status(404).send("User not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userProfilesRouter;
