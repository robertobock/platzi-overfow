import {Answer} from '../answer/answer.model';

export class Question {
  _id?: string;
  titulo: string;
  description: string;
  createdAt?: Date;
  icon?: string;
  answers: Answer[];
  constructor(
    titulo: string,
    description: string,
    createdAt?: Date,
    icon?: string
  ) {
    this._id = '1';
    this.titulo = titulo;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
  }

}
