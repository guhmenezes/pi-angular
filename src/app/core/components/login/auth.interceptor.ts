import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "src/app/core/services/login.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private login: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.login.getToken()

        if(token !== null){

            const authRequest = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${token}` )
            })

            return next.handle(authRequest)
        }

        return next.handle(req)
    }
}