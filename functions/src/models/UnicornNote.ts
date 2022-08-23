import { ObjectId } from "mongodb";

export default interface UnicornNote {
  _id?: ObjectId;
  title: string;
  by: string;
  text: string;
  uid: string;
}
