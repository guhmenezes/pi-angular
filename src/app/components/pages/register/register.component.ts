import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPF } from 'src/app/models/userPF';
import { UserPJ } from 'src/app/models/userPJ';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: UserPF[] | UserPJ[] = [];
  input!:string ;
  cpf?: string;
  cnpj?: string;
  // password!: string;
  // passwordConfirm!: string;
  passwordValid: boolean = false; 
  // isCpf: boolean = false;
  // isCnpj: boolean = false;

  // @ViewChild('registerForm',{static: true}) registerForm: NgModel

  constructor(private register: RegisterService, 
              private fb: FormBuilder,
              private router: Router) { 
    this.registerForm = this.fb.group({
      cpforcnpj: '',
      createPassword: '',
      confirmPassword: '',
      registerPF: this.fb.group({
        cpf: '',
        senha: '',
        nome:  ['', Validators.required],
        data_nascimento:  ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
      }),
      // "razaoSocial" : "empresa sauro ltda",                    |   "cnpj" : "00000000000191",
      // "nomeFantasia" : "sauro services",                       |   "password" : "123456",
      // "cnpj" : "00000000000191",                               |   "corporateName" : "empresa sauro ltda",
      // "email" : "teste@teste.com.br",                          |   "tradeName" : "sauro SERVICES",
      // "telefone" : "1934521410",                               |   "startDate" : "16/08/1999",
      // "senha" : "123456",                                      |   "email" : "teste@teste.com.br",
      // "dataCriacao" : "1999-08-16"  
      registerPJ: this.fb.group({
        cnpj: '',
        senha: '',
        razaoSocial: ['', Validators.required],
        nomeFantasia: ['', Validators.required],
        dataCriacao:['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
      }),
      accept: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {

  }

  getCpfOrCnpj(){
    this.cpf = undefined;
    this.cnpj = undefined;
    let value = this.registerForm.get('cpforcnpj')?.value
    console.log(value.length)
    switch (value.length) {
      case 14:
        console.log('é cpf')
        this.cpf = value;
        this.registerForm.get('registerPF')?.patchValue({
          cpf: value.replaceAll('.','').replaceAll('-','')
        })
        // this.isCpf = true
        break
      case 18:
        console.log('é cnpj')
        this.cnpj = value;
        this.registerForm.get('registerPJ')?.patchValue({
          cnpj: value.replaceAll('.','').replaceAll('/','').replaceAll('-','')
        })
        // this.isCnpj = true
        break
      default:
        alert('CPF ou CNPJ inválido')
    }
  }

  showPass(){
    console.log('ver')
    console.log(document.getElementsByName('password'))
    document.getElementsByName('password')[0].attributes[1].nodeValue = 'text'
  }

  hidePass(){
    console.log('esconder')
    if( document.getElementsByName('password')[0].attributes[1].nodeValue=== 'text')
    console.log(document.getElementsByName('password'))
    document.getElementsByName('password')[0].attributes[1].nodeValue = 'password'
  }

  back(){
    this.cpf = undefined;
    this.cnpj = undefined;
    this.registerForm.reset();

  }

  validPassword(){
    this.passwordValid = false;
    let createPassword = this.registerForm.get('createPassword')?.value
    let confirmPassword = this.registerForm.get('confirmPassword')?.value
    if (createPassword.length >= 4 && createPassword === confirmPassword){
      console.log('bingo');
      if (this.cpf) {        
        this.registerForm.get('registerPF')?.patchValue({
          senha: confirmPassword  
        })
      } else if (this.cnpj) {
        this.registerForm.get('registerPJ')?.patchValue({
          senha: confirmPassword  
        })
      }
      this.passwordValid = true;
    }
  }

  // verifyValidTouched(input: string){
  //   return !this.registerForm.get(input)?.valid && this.registerForm.get(input)?.touched 
  // }

  // errorField(input: string){
  //   return {      
  //     'has-error': this.verifyValidTouched(input),
  //     'has-feedback': this.verifyValidTouched(input)
  //   }
  // }

  treatingInfo(){
    let name = this.registerForm.get('registerPF')?.get('nome')?.value.toLowerCase();
    let birthDate = this.registerForm.get('registerPF')?.get('data_nascimento')?.value.split('/');
    console.log(birthDate)
    this.registerForm.get('registerPF')?.patchValue({
      nome: name,
      data_nascimento: birthDate.reverse().join('-')
    });
    let corporateName = this.registerForm.get('registerPJ')?.get('razaoSocial')?.value.toLowerCase();
    let tradeName = this.registerForm.get('registerPJ')?.get('nomeFantasia')?.value.toLowerCase();
    let startDate = this.registerForm.get('registerPJ')?.get('dataCriacao')?.value.split('/');
    console.log(startDate)
    this.registerForm.get('registerPJ')?.patchValue({
      razaoSocial: corporateName,
      nomeFantasia: tradeName,
      dataCriacao: startDate.reverse().join('-')
    });
  }

  createUser(){
    this.treatingInfo()
    let bodyPF = this.registerForm.get('registerPF');
    console.log(bodyPF)
    let bodyPJ = this.registerForm.get('registerPJ');
    if(bodyPF?.valid){
      this.register.createConsumer(bodyPF?.value).subscribe(
        () => {
            console.log('usou o createconsumer');
            console.log(bodyPF?.value)
            console.log(bodyPF?.valid)
            // console.log('Response =', response)
            // console.log('Status =', response.status)
            alert('Usuário cadastrado com sucesso');
            this.registerForm.reset();
            this.router.navigate(['/'])
          }
        // },
        // error => {
        //   console.log('deu ruim')
        //   console.log('Erro', error.status) 
        //   }
      )
    } else if(bodyPJ?.valid){
      this.register.createCorporate(bodyPJ?.value).subscribe(
        () => {
            console.log('usou o createcorporate');
            console.log(bodyPJ?.value)
            console.log(bodyPJ?.valid)
            alert('Empresa cadastrada com sucesso');
            this.registerForm.reset();
            this.router.navigate(['/'])

        }
      )
    }
  }
  
  // set filter(value: string){
  //   this.input = value;
  //   // this.isCpf = (this.input.length <= 11) ? true : false 
  //   // this.isCnpj = (this.input.length > 11) ? true : false 
  //   // this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
  // }

  // get filter(){
  //   return this.input;
  // }
}
