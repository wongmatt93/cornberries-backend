import { ObjectId } from "mongodb";

export default interface UserProfile {
  _id?: ObjectId;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  uid: string;
}
