import {Component, OnInit} from '@angular/core';
import {Question} from './question.model';
import {QuestionService} from './question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: [
    'question-list.component.css'
  ]
})
export class QuestionListComponent implements OnInit {
  questions?: Question[] = [];
  loadin = true;
  constructor(public questionService: QuestionService) {
  }
  ngOnInit() {
    this.questionService.getQuestions().subscribe( (response: Question[] ) => {
      this.questions = response;
      this.loadin = false;
    });
  }
}
