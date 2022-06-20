import { EventEmitter, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, Subject, map } from 'rxjs';

import { UserPF } from '../models/userPF';
import { UserPJ } from '../models/userPJ';
import { Login } from '../models/login';
import { Card } from '../models/card';
import { Promo } from '../models/promo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsersUrl = 'http://localhost:3100/api/users'
  private loginUrl = 'http://192.168.0.15:8080/login'
  private userAuth: boolean = false;
  private getConsumerInfo = `${environment.API2}v1/usuario`
  private getConsumerCards = `${environment.API2}v1/ /cartoes`
  private getCorporateInfo = `${environment.API2}v1/empresa`
  private getCorporatePromo = `${environment.API2}v1/ /promocoes`
  private loginTokenUrl = `${environment.API}v1/login2`
  private getCardsUrl = 'http://localhost:8080/v1/usuarios/thiscpf/cartoes'
  private getPromoUrl = 'http://localhost:8080/v1/promocao/promocaoid'
  static emitUserLogged = new EventEmitter()
  private subject = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': '1',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    }),
    // observe: 'response'
  };

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
    if (user.username === userRegistered.username && user.senha === userRegistered.senha){
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

  userAuthenticated(condition: boolean){
    if (condition){
      this.userAuth = true;
        this.router.navigate(['/login'])
    } else {
      this.userAuth = false;
      this.router.navigate(['/'])
    }
  }

  getToken(){
    return window.localStorage.getItem('token')
  }

  setToken(token:string){
    window.localStorage.setItem('token',token)
  }

  loginToken(user: Login){
    return this.httpClient.post<any>(this.loginTokenUrl, user)
  }

  loginAPI(user:Login){
    return this.httpClient.post<any>(this.loginUrl, user)
    // return user;
      // login successful if there's a jwt token in the response
      // console.log("USER: " + user);

        // if (user) {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        // }

    
  }

  
isUserAlreadyRegistered(username: string){
  if(username === '00000000000' || username === '00000000000000'){
    // this.getConsumer().subscribe()
    return true
  }
  return false
}

  isAuth(){
    return this.userAuth;
  }

  isntAuth(){
    this.userAuth = false
  }

  getAllConsumers(): Observable<UserPF[]>{
    return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  }

  getConsumer(username: string): Observable<any>{
    return this.httpClient.get<any>(`${this.getConsumerInfo}/${username}`, this.httpOptions)
    // return this.httpClient.get<UserPF>('http://localhost:8080/v1/usuarios/thiscpf')
  }

  getInfo(){
    return {
      id: window.localStorage.getItem('userId'),
      nome: window.localStorage.getItem('nome'),
      email: window.localStorage.getItem('email'),
      telefone: window.localStorage.getItem('telefone')
    }
  }

  getAllCorporates(): Observable<UserPJ[]>{
    return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  }

  getCorporate(username:string): Observable<any>{
    return this.httpClient.get<any>(`${this.getCorporateInfo}/${username}`)
    // return this.httpClient.get<UserPJ>('http://localhost:8080/v1/usuarios/thiscnpj')
  }

  getAllCards(): Observable<Card[]>{
  return this.httpClient.get<Card[]>(this.getCardsUrl)
  }

  getCards(idConsumer:string){
    return this.httpClient.get<any>(this.getConsumerCards.replace(' ', idConsumer))
  }

  // getInfoCard(idPromocao:string){
  //   return this.httpClient.get<Card>(this.)
  // }

  getAllPromo(): Observable<Promo[]>{
    return this.httpClient.get<Promo[]>(this.getPromoUrl)
    }

  getPromo(idCorporate:string){
    return this.httpClient.get<any>(this.getCorporatePromo.replace(' ', idCorporate))
  }

  getUser(username:string): Observable<any>{
    if (username.length == 11) return this.httpClient.get<any>(`${this.getConsumerInfo}/${username}`)
    return this.httpClient.get<any>(`${this.getCorporateInfo}/${username}`)
    // correto return this.httpClient.get<UserPF>(`${this.getUserInfo}/${username}`)
  }

  setUsername(username: string) {
    LoginService.emitUserLogged.emit({username: username})
}

  getUsername(): Observable<string> {
    return this.subject.asObservable();
}

}

