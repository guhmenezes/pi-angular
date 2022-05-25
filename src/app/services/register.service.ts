import { Injectable } from '@angular/core';
import { UserPF } from '../models/userPF';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserPJ } from '../models/userPJ';
import { Promo } from '../models/promo';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private getUsersUrl = 'http://localhost:3100/api/users';
  private createUserUrl = 'http://localhost:8080/v1/usuarios';
  private getUserInfo = 'http://localhost:8080/v1/usuarios/thiscpf';
  private updateInfo = 'http://localhost:8080/v1/usuarios/thiscpf/edit'; // construir endpoint atualizar
  private createPromoUrl = 'http://localhost:8080/v1/promocao';
  private createCardUrl = 'http://localhost:8080/v1/cartao';
  private stampCardUrl = 'http://localhost:8080/v1/carimbo';


  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Request-Origin': '**',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //   });

  // httpOptions = {
  //   headers: this.headers
  // };


  constructor(private httpClient: HttpClient) { }

  createConsumer(user: UserPF): Observable<any>{
    return this.httpClient.post<Response>(this.createUserUrl, user)
  }

  createCorporate(user: UserPJ): Observable<UserPJ>{
    return this.httpClient.post<UserPJ>(this.createUserUrl, user)
  }

  getConsumer(userAuth: boolean):Observable<UserPF> | any{
    if(userAuth === true) return this.httpClient.get<UserPF>(this.getUserInfo)
    return null
  }

  editConsumer(cpf:string, newData: UserPF){
    return this.httpClient.put(this.updateInfo, newData)
  }

  createPromo(newPromo: any): Observable<Promo> {
    return this.httpClient.post<any>(this.createPromoUrl, newPromo)
  }

  createCard(body:any): Observable<Card> {
    return this.httpClient.post<Card>(this.createCardUrl, body)
  }

  stampCard(body:any): Observable<Response>{
    return this.httpClient.post<Response>(this.stampCardUrl, body)
  }

  // getAllConsumers(): Observable<UserPF[]>{
  //   return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  // }

  // getAllCorporates(): Observable<UserPJ[]>{
  //   return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  // }
}

