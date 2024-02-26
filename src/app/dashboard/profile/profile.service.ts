import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { UserInterface } from '../../common/user/user.interface';
import { ResponseInterface } from '../../common/server/response.interface';
import { ProfileInterface } from './profile.interface';
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
export class ProfileService {
  //private API_DOMAIN: string = environment.API_DOMAIN;
  private API_DOMAIN: string = 'https://kudutaskapi-rhcjor10.b4a.run';

  constructor(private http: HttpClient) { }

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


  // update user profile
  update(profile: ProfileInterface): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.API_DOMAIN}/api/user`, profile, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // delete user profile
  delete(userId: string): Observable<ResponseInterface> {
    return this.http.delete<ResponseInterface>(`${this.API_DOMAIN}/api/user/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }
}
