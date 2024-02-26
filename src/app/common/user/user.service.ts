/* UserService is a data service used to share user profile details between components */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserInterface } from './user.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ResponseInterface } from './../server/response.interface';
import { UserClass } from './user.class';
import { environment } from 'src/environments/environment';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserClass {
  //private API_DOMAIN: string = environment.API_DOMAIN;
  private API_DOMAIN: string = 'https://kudutaskapi-rhcjor10.b4a.run';

  // init user
  private user: UserInterface = null;
  //users: UserInterface[];

  //subject = new Subject<UserInterface>();
  public userSource = new BehaviorSubject(this.user);


  constructor(private http: HttpClient) {
    super()
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle accordingly
      // console.error('An error occured:', error.error.message);
      return throwError(`Request failed due to network error, please try again`);
    } else {
      // Backend returned an unsuccessful response code.
      // The repsonse body contains clues as to what went wrong
      // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
      return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  // update user object
  setUser(user: UserInterface) {
    this.userSource.next(user);
  }

  // get currently loaded user
  getUser = this.userSource.asObservable();

  // get all users
  getUsers(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`${this.API_DOMAIN}/api/user/all`, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // get user details from their emails
  getUserFromEmails(emails: string[]): Observable<UserInterface[]> {
    const usersFromEmail: Array<UserInterface> = [];

    return new Observable(observable => {

      // get all users
      this.getUsers().subscribe((res) => {

        // check for each user
        res.obj.forEach((user: UserInterface) => {
          // check for each email
          emails.forEach((email) => {

            if (email === user.email) {
              usersFromEmail.push(user);
            }
          })
        })
        //console.log(usersFromEmail)
        observable.next(usersFromEmail);
        observable.complete();

      }, (error) => {
        console.error(error)
      })

    });
  }

}
