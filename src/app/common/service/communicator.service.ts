import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {ResponseInterface} from './../server/response.interface';

@Injectable({
  providedIn: 'root'
})
export class Communicator {

  constructor() { }

  private subjectName = new Subject<CommunicatorInterface>(); //need to create a subject
    
  triggerChanges(val: CommunicatorInterface) { //the component that wants to update something, calls this fn
    this.subjectName.next(val); //next() will feed the value in Subject
  }
    
  implementChanges(): Observable<CommunicatorInterface> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}

export interface CommunicatorInterface {
  refresh: boolean;
  obj: ResponseInterface;
}
