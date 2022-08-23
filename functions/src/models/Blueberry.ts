import { ObjectId } from "mongodb";

export default interface Blueberry {
  _id?: ObjectId;
  notesId: string;
  uid: string;
}
