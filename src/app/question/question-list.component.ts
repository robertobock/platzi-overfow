import {Component, Input, OnInit} from '@angular/core';
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
  @Input() sort = '-createdAt';
  loading = true;
  constructor(public questionService: QuestionService) {
  }
  ngOnInit() {
    this.questionService.getQuestions(this.sort).subscribe( (response: Question[] ) => {
      this.questions = response;
      this.loading = false;
    });
  }
}
