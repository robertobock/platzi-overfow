import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Question} from './question.model';
import urljoin from 'url-join';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Answer} from '../answer/answer.model';
import {stringify} from 'querystring';
@Injectable()
export class QuestionService {
  private questionsUrl: string;
  constructor(public http: HttpClient) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }
  getQuestions() {
    return this.http.get(this.questionsUrl);
  }
  getQuestion(id) {
    const questionUrl = urljoin(this.questionsUrl, id);
    return this.http.get(questionUrl);
  }
  addQuestion (question: Question) {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = this.getToken();
    const url = this.questionsUrl + token;
    return this.http.post(url, body, { headers });
  }
  addAnswer (answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = this.getToken();
    const answerUrl = urljoin(this.questionsUrl, String(answer.question._id), 'answers') + token;
    return this.http.post(answerUrl, body, { headers });
  }
  getToken() {return `?token=${localStorage.getItem('token')}`}
  handleError(error) {
    const errorMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errorMsg);
  }
}
