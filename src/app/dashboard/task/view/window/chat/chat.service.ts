import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ResponseInterface } from '../../../../../common/server/response.interface';
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
export class ChatService implements OnInit {
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

  ngOnInit(): void {
  }

  // send message chat
  sendChatMsg(msgObj: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(`${this.API_DOMAIN}/api/task/progress/msg`, msgObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
  }

  // get message chat
  getChatMsg(userId: string, taskId: string): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`${this.API_DOMAIN}/api/task/progress/msg/${userId}/${taskId}`, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
  }




}