import { EventEmitter, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';

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
  private getUserInfo = 'http://localhost:8080/v1/usuarios'
  private getCardsUrl = 'http://localhost:8080/v1/usuarios/thiscpf/cartoes'
  private getPromoUrl = 'http://localhost:8080/v1/promocao/promocaoid'
  static emitUserLogged = new EventEmitter()
  private subject = new Subject<string>();

  // showMenuEmitter = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient , private router: Router) { }
  
  login(user: Login, userRegistered: Login){
    // var username, password = '';
    console.log(user.username.length)
    // if(user.username.length === 11){
      // this.getUser(user.username).subscribe({
      //   next: response => {
      //     if(response.cnpj)
      //     var username = response.cnpj
      //     else username = response.cpf
      //     var password = response.senha
      //   }
      // })
    // } else if(user.username.length === 14){
    //   username = userRegisteredPJ!.cnpj
    //   password = userRegisteredPJ!.password
    // }
    console.log(user,userRegistered)
    // this.emitUserLogged.emit(userRegistered.username)
    if (user.username === userRegistered.username && user.password === userRegistered.password){
      this.userAuth = true;
    //   // this.showMenuEmitter.emit(true);
      this.router.navigate(['/login'])
    } else {
      // this.userAuth = true;
    //   // this.showMenuEmitter.emit(false);
      alert('Usuário e/ou senha incorretos.')
    }
  }

  // getUser(user: Login): Observable<Login>{
  //   return this.httpClient.post<Login>(this.loginUrl, user)
  // }

  isAuth(){
    return this.userAuth;
  }

  isntAuth(){
    this.userAuth = false
  }

  getAllConsumers(): Observable<UserPF[]>{
    return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  }

  getConsumer(): Observable<UserPF>{
    // return this.httpClient.get<UserPF>(`${this.getUserInfo}`)
    return this.httpClient.get<UserPF>('http://localhost:8080/v1/usuarios/thiscpf')
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

  getUser(username:string): Observable<UserPF|UserPJ>{
    if (username.length == 14) return this.httpClient.get<UserPJ>(`${this.getUserInfo}/thiscnpj`)
    return this.httpClient.get<UserPF>(`${this.getUserInfo}/thiscpf`)
    // correto return this.httpClient.get<UserPF>(`${this.getUserInfo}/${username}`)
  }

  setUsername(username: string) {
    LoginService.emitUserLogged.emit({username: username})
}

  getUsername(): Observable<string> {
    return this.subject.asObservable();
}

}

