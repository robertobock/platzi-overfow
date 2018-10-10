import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: [ './signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const {firstName, lastName, email, password} = this.signupForm.value;
      const user: User = new User(email, password, firstName, lastName);
       this.authService.signUp(user).subscribe(
         () => {},
         this.authService.handleError
       );
    }
  }
}
