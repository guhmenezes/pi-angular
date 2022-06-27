import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Login } from '../models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = environment.API 

  private loginTokenUrl = `${this.API_URL}login`

  private userAuth: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': '1',
    }),
  };

  constructor(private httpClient: HttpClient , private router: Router) { }

  login(user: Login){
    return this.httpClient.post<any>(this.loginTokenUrl, user, this.httpOptions)
  }

  getToken(){
    return window.localStorage.getItem('token')
  }

  setToken(token:string){
    window.localStorage.setItem('token',token)
  }

  userAuthenticated(condition: boolean, redirect: boolean){
    if (condition){
      this.userAuth = true;
        if(redirect)
        this.router.navigate(['/dashboard'])
    } else {
      this.userAuth = false;
      this.router.navigate(['/'])
    }
  }
  
  isAuth(){
    return this.userAuth;
  }

  isntAuth(){
    this.userAuth = false
  }

  isUserAlreadyRegistered(username: string){
    //IMPLEMENTAR FUNÇÃO
    return false
  }

  logout(){
    this.isntAuth()
    window.localStorage.removeItem('id'),
    window.localStorage.removeItem('nome'),
    window.localStorage.removeItem('username'),
    window.localStorage.removeItem('email'),
    window.localStorage.removeItem('telefone'),
    window.localStorage.removeItem('token'),
    window.localStorage.removeItem('havePromo')
    window.localStorage.removeItem('carimbos')
    window.localStorage.removeItem('dataValidade')
    window.localStorage.removeItem('descricao')
    window.localStorage.removeItem('stampUser')
  }

}

