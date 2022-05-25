import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

import { UserPF } from '../models/userPF';
import { UserPJ } from '../models/userPJ';
import { Login } from '../models/login';
import { Card } from '../models/card';
import { Promo } from '../models/promo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsersUrl = 'http://localhost:3100/api/users'
  private loginUrl = 'http://localhost:8080/login'
  private userAuth: boolean = false;
  private getUserInfo = 'http://localhost:8080/v1/usuarios/thiscpf'
  private getCardsUrl = 'http://localhost:8080/v1/usuarios/thiscpf/cartoes'
  private getPromoUrl = 'http://localhost:8080/v1/promocao/promocaoid'
  

  // showMenuEmitter = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient , private router: Router) { }
  
  login(user: Login, userRegistered: UserPF){
    if (user.username === userRegistered?.cpf && user.password === userRegistered.senha!){
      this.userAuth = true;
    //   // this.showMenuEmitter.emit(true);
      this.router.navigate(['/login'])
    } else {
      this.userAuth = true;
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

  getConsumer(): Observable<UserPF>{
    return this.httpClient.get<UserPF>(`${this.getUserInfo}`)
  }

  getAllCorporates(): Observable<UserPJ[]>{
    return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  }

  getAllCards(): Observable<Card[]>{
  return this.httpClient.get<Card[]>(this.getCardsUrl)
  }

  getAllPromo(): Observable<Promo[]>{
    return this.httpClient.get<Promo[]>(this.getPromoUrl)
    }

}

