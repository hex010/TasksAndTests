import { ReactedUser } from "./reacted-user.model";

export interface Quiz {
    id: number;
    authorUsername: string;
    header: String;
    description: String;
    creationDate: string;
    likes: number;
    dislikes: number;
    reactedUsers: ReactedUser[];
  }