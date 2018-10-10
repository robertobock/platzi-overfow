import {Routes} from '@angular/router';
import {QuestionListComponent} from './question-list.component';
import {QuestionDetailComponent} from './question-detail.component';
import {QuestionFormComponent} from './question-form.component';

export const QUESTION_ROUTES: Routes = [
  {path: '', component: QuestionListComponent},
  {path: 'new-question', component: QuestionFormComponent},
  {path: ':id', component: QuestionDetailComponent}
];
