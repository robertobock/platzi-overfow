import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import urljoin from 'url-join';
import {environment} from '../../environments/environment';
import {User} from './user.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
@Injectable()
export class AuthService {
  autUrl: string;
  currentUser?: User;
  constructor(private httpClient: HttpClient,
              public router: Router,
              public snackBar: MatSnackBar) {
    this.autUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLogedIn()) {
      const {userId, firstName, lastName, email} = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }
  signIn(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(urljoin(this.autUrl, 'signin'), body, {headers}).pipe(
      map((response: User) => {
        this.login(response);
        return response;
      })
    );
  }
  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(urljoin(this.autUrl, 'signup'), body, {headers}).pipe(
      map((response: User) => {
        this.login(response);
        return response;
      })
    );
  }
  login({email, firstName, lastName, userId, token}: any) {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({userId, firstName, lastName, email}));
    this.router.navigateByUrl('/');
  }
  isLogedIn() {
    return localStorage.getItem('token') !== null;
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  showError(message) {
    this.snackBar.open(message, 'x', {duration: 2500 });
  }
  public handleError = (error: any) => {
    const {error: {error: { name }}, message} = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha ocurrido un error con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Intenta de nuevo');
    }
    this.logout();
  }
}
