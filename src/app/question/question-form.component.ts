import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Question} from './question.model';
import icons from './icons';
import {QuestionService} from './question.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  icons: Object[] = icons;
  constructor(private questionService: QuestionService, private router: Router, public authService: AuthService) {
  }
  getIconVersion(icon) {
    if (icon.versions.font.includes('plain-wordmark')) {
      return 'plain-wordmark';
    } else if (icon.versions.font.includes('original')) {
      return 'original';
    } else {
      return 'plain';
    }
  }
  onSubmit(form: NgForm) {
    const q: Question = new Question(
      form.value.title,
      form.value.description
    );
    this.questionService.addQuestion(q).subscribe((question: Question) => {
      form.reset();
      this.router.navigate(['/']);
    }, this.authService.handleError
    );

  }
}
