import {Component, OnDestroy, OnInit} from '@angular/core';
import {Question} from './question.model';
import {QuestionService} from './question.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
  })
export class QuestionDetailComponent implements OnInit, OnDestroy {
  constructor(private questionService: QuestionService, private route: ActivatedRoute) {}
  question?: Question;
  loading = true;
  sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.questionService.getQuestion(params.id).subscribe((question: Question) => {
        this.question = question;
        this.loading = false;
      });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
