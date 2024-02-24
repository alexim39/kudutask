import { Injectable } from '@angular/core';
import { SignInInterface } from './sign-in.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry, shareReplay } from 'rxjs/operators';
import { ResponseInterface } from './../../../common/server/response.interface';
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
export class SignInService {
  private API_DOMAIN: string = environment.API_DOMAIN;

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

  signIn(signInObj: SignInInterface): Observable<ResponseInterface> {

    return this.http.post<ResponseInterface>(`${this.API_DOMAIN}/api/auth/signin`, signInObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        shareReplay(),
        catchError(this.handleError)
      );
  }

}
