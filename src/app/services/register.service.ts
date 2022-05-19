import { Injectable } from '@angular/core';
import { UserPF } from '../models/userPF';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserPJ } from '../models/userPJ';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  getUsersUrl = 'http://localhost:3100/api/users'
  createUserUrl = 'http://localhost:8080/v1/usuarios'
  getUserInfo = 'http://localhost:8080/v1/usuarios/thiscpf'


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Request-Origin': '**',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

  httpOptions = {
    headers: this.headers
  };


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

  // getAllConsumers(): Observable<UserPF[]>{
  //   return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  // }

  // getAllCorporates(): Observable<UserPJ[]>{
  //   return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  // }
}

