import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

import { UserPF } from '../models/userPF';
import { UserPJ } from '../models/userPJ';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsersUrl = 'http://localhost:3100/api/users'
  private loginUrl = 'http://localhost:8080/login'
  private userAuth: boolean = false;

  // showMenuEmitter = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient , private router: Router) { }
  
  login(user: Login, userRegistered: UserPF){
    if (user.username === userRegistered?.cpf && user.password === userRegistered.senha!){
      this.userAuth = true;
    //   // this.showMenuEmitter.emit(true);
      this.router.navigate(['/login'])
    } else {
      this.userAuth = false;
    //   // this.showMenuEmitter.emit(false);
      alert('Usuário e/ou senha incorretos.')
    }
  }

  getUser(user: Login){
    return this.httpClient.post<Response>(this.loginUrl, user, {observe:'response'})
  }

  isAuth(){
    return this.userAuth;
  }

  getAllConsumers(): Observable<UserPF[]>{
    return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  }

  getConsumer(cpf: string): Observable<UserPF>{
    return this.httpClient.get<UserPF>(`${this.getUsersUrl}/${cpf}`)
  }

  getAllCorporates(): Observable<UserPJ[]>{
    return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  }
}

