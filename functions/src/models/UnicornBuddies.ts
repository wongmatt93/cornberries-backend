import { ObjectId } from "mongodb";

export default interface UnicornBuddies {
  id?: ObjectId;
  uid1: string;
  uid2: string;
  accepted: boolean;
}
