import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardService } from './../dashboard/dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor() {   }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.getToken()}`
            }
        })
        return next.handle(tokenizedReq);
    }

    getToken() {
        return localStorage.getItem('token')
    }
}