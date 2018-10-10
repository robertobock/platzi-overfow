import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Answer} from './answer.model';
import {Question} from '../question/question.model';
import {User} from '../auth/user.model';
import {QuestionService} from '../question/question.service';
import SweetScroll from "sweet-scroll";
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent {
  @Input() question: Question;
  sweetScroll: SweetScroll;
  constructor(private questionService: QuestionService, public authService: AuthService) {
    this.sweetScroll = new SweetScroll();
  }
  user: User = new User(null, null, 'Roberto', 'Bock');
  onSubmit(form: NgForm) {
    const answer = new Answer(form.value.description, this.question, new Date, this.user);
    this.questionService.addAnswer(answer).subscribe((a: Answer) => {
      this.question.answers.unshift(a);
      const elem = document.getElementById('pregunta');
      this.sweetScroll.toElement(elem);
      form.reset();
    }, this.authService.handleError
    );
  }
}
