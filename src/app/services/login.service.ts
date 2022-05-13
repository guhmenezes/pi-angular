import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { UserPF } from '../models/userPF';
import { UserPJ } from '../models/userPJ';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsersUrl = 'http://localhost:3100/api/users'

  private userAuth: boolean = false;

  // showMenuEmitter = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient , private router: Router) { }
  
  login(user: Login, userRegistered: UserPF){
    if (user.login === userRegistered?.cpf && user.password === userRegistered.senha!){
      this.userAuth = true;
    //   // this.showMenuEmitter.emit(true);
      this.router.navigate(['/login'])
    } else {
      this.userAuth = false;
    //   // this.showMenuEmitter.emit(false);
      alert('Usuário e/ou senha incorretos.')
    }
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

