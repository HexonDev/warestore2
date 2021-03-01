import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  loginUser(username, password){
    return this.http.post<User>("https://localhost:44304/api/Users/authenticate", {"username": username, "password": password})
      .pipe(map(user => {
        localStorage.setItem("user", JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logoutUser(){
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  registerUser(user: User){
    return this.http.post("https://localhost:44304/api/Users/register", user);
  }
}
