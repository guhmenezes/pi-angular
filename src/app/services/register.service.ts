import { Injectable } from '@angular/core';
import { UserPF } from '../models/userPF';
import { HttpClient, HttpParamsOptions, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserPJ } from '../models/userPJ';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  getUsersUrl = 'http://localhost:3100/api/users'
  createUserUrl = 'http://localhost:8080/v1/usuarios'
  constructor(private httpClient: HttpClient) { }

  createConsumer(user: UserPF): Observable<HttpResponse<Response>>{
    return this.httpClient.post<Response>(this.createUserUrl, user, {observe: 'response'})
  }

  createCorporate(user: UserPJ): Observable<UserPJ>{
    return this.httpClient.post<UserPJ>(this.createUserUrl, user)
  }

  // getAllConsumers(): Observable<UserPF[]>{
  //   return this.httpClient.get<UserPF[]>(this.getUsersUrl)
  // }

  // getAllCorporates(): Observable<UserPJ[]>{
  //   return this.httpClient.get<UserPJ[]>(this.getUsersUrl)
  // }
}

