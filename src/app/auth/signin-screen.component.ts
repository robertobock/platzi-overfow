import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-signin-screen',
  templateUrl: './signin-screen.component.html',
  styleUrls: ['./signin-screen.component.css']
})
export class SigninScreenComponent implements OnInit {
  signingForm: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signingForm = new FormGroup({
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
    if (this.signingForm.valid) {
      const {email, password, firstName, lastName} = this.signingForm.value;
      const user = new User(email, password);
      this.authService.signIn(user).subscribe(
        () => {},
        this.authService.handleError
      );
    }
  }
}
