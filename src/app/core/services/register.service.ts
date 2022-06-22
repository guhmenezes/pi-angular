import { Injectable } from '@angular/core';
import { UserPF } from '../models/userPF';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserPJ } from '../models/userPJ';
import { Promo } from '../models/promo';
import { Card } from '../models/card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // private getUsersUrl = 'http://localhost:3100/api/users'; TESTE
  private API_URL = environment.API 

  private createUserUrl = `${this.API_URL}v1/signup`;
  // private createUserPJUrl = 'http://localhost:8080/v1/empresas';
  private getUserInfo = 'http://localhost:8080/v1/usuarios/thiscpf';
  // private updateInfo = 'http://localhost:8080/v1/usuarios/thiscpf/edit'; // construir endpoint atualizar
  private createPromoUrl = `${this.API_URL}v1/promocao`;
  private createCardUrl = `${this.API_URL}v1/cartaofidelidade`;
  private stampCardUrl = `${this.API_URL}v1/carimbo`;


  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Request-Origin': '**',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //   });

  // httpOptions = {
  //   headers: this.headers
  // };


  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
    ) { }

  isCpfValid(cpf:string){
    let firstVerify= 0;
    let secondVerify = 0;
    let firstDigit: boolean;
    let secondDigit: boolean;

    for (let i = 0; i < cpf.length -2; i++ )
    firstVerify += +(cpf[i])*(i+1);

    if (firstVerify % 11 == 10) firstVerify = 0;
    firstDigit = firstVerify % 11 == +(cpf[9]);

    for (let i = 0; i < cpf.length -1; i++ )
    secondVerify += +(cpf[i])* i;

    if (secondVerify % 11 == 10) secondVerify = 0;
    secondDigit = secondVerify % 11 == +(cpf[10]);

    if (firstDigit && secondDigit)
      return true
    else
      return false
}

isCnpjValid(cnpj:string){
  return true
}

  createUser(user: any): Observable<any>{
    return this.httpClient.post(this.createUserUrl, user)
  }

  // createCorporate(user: UserPJ): Observable<UserPJ>{
  //   return this.httpClient.post<UserPJ>(this., user)
  // }

  getConsumer(userAuth: boolean):Observable<UserPF> | any{
    if(userAuth === true) return this.httpClient.get<UserPF>(this.getUserInfo)
    return null
  }

  // editConsumer(cpf:string, newData: UserPF){
  //   return this.httpClient.put(this.updateInfo, newData)
  // }

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

