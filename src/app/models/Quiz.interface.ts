import { Question } from "./Question.interface";
import { ReactedUser } from "./reacted-user.model";

export interface Quiz {
    id: number;
    authorUsername: string;
    header: string;
    description: string;
    creationDate: string;
    likes: number;
    dislikes: number;
    solved: boolean;
    reactedUsers: ReactedUser[];

    questions: Question[];
    timerInSeconds: number;
  }