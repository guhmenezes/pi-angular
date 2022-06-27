import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promo } from 'src/app/core/models/promo';
import { Card } from 'src/app/core/models/card';
import { StampCode } from 'src/app/core/models/stampCode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private API_URL = environment.API
  
  private getConsumerInfo = `${this.API_URL}v1/usuario`
  private getCardsInfo = `${this.API_URL}v1/ /cartoes`
    // private updateInfo = `${this.API_URL}v1/usuario/cpf/edit`; // construir endpoint atualizar

  private getCorporateInfo = `${this.API_URL}v1/empresa`
  private getPromoInfo = `${this.API_URL}v1/ /promocoes`
  private createPromoUrl = `${this.API_URL}v1/promocao`;
  private createCardUrl = `${this.API_URL}v1/cartaofidelidade`;
  private stampCardUrl = `${this.API_URL}v1/carimbo`;

  constructor(private httpClient: HttpClient) { }
  
  setInfo(
  id: string, 
  nome: string, 
  email?: string, 
  telefone?: string) 
  {
    window.localStorage.setItem('id', id)
    window.localStorage.setItem('nome', nome)
    window.localStorage.setItem('email', email? email : '')
    window.localStorage.setItem('telefone', telefone? telefone : '')
  }

  getInfo(){
    const info = {
      id: window.localStorage.getItem('id'),
      nome: window.localStorage.getItem('nome'),
      username: window.localStorage.getItem('username'),
      email: window.localStorage.getItem('email'),
      telefone: window.localStorage.getItem('telefone'),
      token: window.localStorage.getItem('token'),
      havePromo: window.localStorage.getItem('havePromo')
    }
    return info
  }

  getUser(username:string): Observable<any>{
    if (username.length == 11) return this.httpClient.get<any>(`${this.getConsumerInfo}/${username}`)
    return this.httpClient.get<any>(`${this.getCorporateInfo}/${username}`)
    // correto return this.httpClient.get<UserPF>(`${this.getUserInfo}/${username}`)
  }

  getCards(idConsumer:string){
    return this.httpClient.get<any>(this.getCardsInfo.replace(' ', idConsumer))
  }

  getId(){
    return window.localStorage.getItem('id')!
  }

  getPromo(idCorporate:string){
    return this.httpClient.get<any>(this.getPromoInfo.replace(' ', idCorporate))
  }

  setPromo(havePromo:string, validade?: string, descricao?: string, carimbos?: string){
    window.localStorage.setItem('havePromo', havePromo)
    if(validade && descricao && carimbos){
    window.localStorage.setItem('dataValidade', validade)!
    window.localStorage.setItem('descricao', descricao)!
    window.localStorage.setItem('carimbos', carimbos)!
    }
  }

  havePromo(){
    if (window.localStorage.getItem('havePromo')! != 'false' &&
     window.localStorage.getItem('havePromo')) return true
    return false
  }

  createPromo(newPromo: any): Observable<Promo> {
    return this.httpClient.post<any>(this.createPromoUrl, newPromo)
  }

  createCard(body:any): Observable<Card> {
    return this.httpClient.post<Card>(this.createCardUrl, body)
  }

  stampCard(body:any): Observable<StampCode>{
    return this.httpClient.post<StampCode>(this.stampCardUrl, body)
  }

  stamp(urlCarimbo:string){
    return this.httpClient.post(urlCarimbo, {})
  }
  
} 