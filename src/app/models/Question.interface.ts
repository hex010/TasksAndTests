import { Answer } from "./Answer.interface";

export interface Question {
    id: number;
    text: string;
    answers: Answer[]
}