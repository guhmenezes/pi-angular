import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "src/app/core/services/login.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private login: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZUB0ZXN0ZS5jb20uYnIiLCJyb2xlIjpbXSwiZXhwIjoxNjU1NTIxMzAwfQ.sWWLArJRSyqYByw1jVJeFGb0CQwYL7WIcfUtEshmwbrNq97IVOLh3QKHqXDBqZf9GrlV8k1CsedY7WImXAwySw'

        // if(token !== null){

        //     const authRequest = req.clone({setHeaders: {"Authorization": `Bearer ${token}` }})

        //     return next.handle(authRequest)
        // }

        return next.handle(req)
    }
}