import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class JwtInterceptor implements HttpInterceptor{

    constructor(){ }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = (localStorage.getItem('token') as string);
        if (token) {
            const authToken = req.clone({
                headers: req.headers.set('Authorization', token)
            })
            return next.handle(authToken);
        }
        else return next.handle(req)
    }
}
