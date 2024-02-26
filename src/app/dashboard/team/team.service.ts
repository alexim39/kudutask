import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TeamInterface } from './team.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ResponseInterface } from './../../common/server/response.interface';
import { TeamClass } from './team.class';
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
export class TeamService extends TeamClass {
  //private API_DOMAIN: string = environment.API_DOMAIN;
  private API_DOMAIN: string = 'https://kudutaskapi-rhcjor10.b4a.run';

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
}