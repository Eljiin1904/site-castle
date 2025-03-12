export interface UserBetSessionDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  expires: Date;
}
