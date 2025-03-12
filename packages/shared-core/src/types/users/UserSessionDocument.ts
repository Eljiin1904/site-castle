// controlled by express-session
export interface UserSessionDocument {
  _id: string;
  session: string;
  expires: Date;
}
