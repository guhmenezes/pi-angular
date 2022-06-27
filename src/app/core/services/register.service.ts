import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private API_URL = environment.API 

  private createUserUrl = `${this.API_URL}v1/signup`;

  constructor(private httpClient: HttpClient) { }

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

}

