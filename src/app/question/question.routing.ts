import {Routes} from '@angular/router';
import {QuestionListComponent} from './question-list.component';
import {QuestionDetailComponent} from './question-detail.component';
import {QuestionFormComponent} from './question-form.component';
import {QuestionScreenComponent} from './question-screen.component';

export const QUESTION_ROUTES: Routes = [
  {path: '', component: QuestionScreenComponent},
  {path: 'new-question', component: QuestionFormComponent},
  {path: ':id', component: QuestionDetailComponent}
];
