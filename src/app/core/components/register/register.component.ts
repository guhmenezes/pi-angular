import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { UserPF } from 'src/app/core/models/userPF';
import { UserPJ } from 'src/app/core/models/userPJ';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: UserPF[] | UserPJ[] = [];
  input!:string ;
  cpf?: string;
  cnpj?: string;
  validDate = false;
  passwordValid: boolean = false; 

  constructor(private register: RegisterService, 
              private info: LoginService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal
              ) { 
    this.registerForm = this.fb.group({
      cpforcnpj: '',
      createPassword: '',
      confirmPassword: '',
      registerPF: this.fb.group({
        nome:  ['', [Validators.minLength(10), Validators.maxLength(38), Validators.required, Validators.pattern(/[A-z]* [A-z]*/)]],
        cpfcnpj: '',
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
        senha: '',
        data_nascimento: '',
        dataNascimento:  ['', [Validators.required]],
      }),
      registerPJ: this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        cpfcnpj: '',
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required],
        senha: '',
        dataCriacao: '',
        contatoNome: ['',[Validators.required, Validators.minLength(2)]],
        data_criacao:['', Validators.required],
      }),
      accept: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    // console.log(this.validDate)
  }

  birthValid(input:string){
    let date = input.split('/')
    let thirtyDays = [4,6,9,10]
    let leap = +date[2] % 4 === 0 ? true : false
    if(thirtyDays.indexOf(+date[1]) > -1 && +date[0] > 30){
      return false
    }
    if(leap && +date[1] === 2 && +date[0] > 29 || 
      !leap && +date[1] === 2 && +date[0] > 28){
      return false
    }
    if (+date[0] > 0 && +date[0] < 32 && 
      +date[1] > 0 && +date[1] < 13 &&
      +date[2] < 2004 && +date[2] > 1910){
        return true
        }
    return false 
  }

  dateValid(input:string){
    let date = input.split('/')
    let currentDate = new Date(Date.now())
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() +1 
    let currentDay = currentDate.getDate()
      if (+date[2] < currentYear && +date[2] > 1998){
         console.log('oiii')
       return true
   } if (+date[2] == currentYear && +date[1] < currentMonth - 3){ 
      console.log('segundo')
       return true}
    if (+date[1] == currentMonth - 3 && +date[0] <= currentDay){
    console.log('ue')
       return true
    }
  return false
  }
  
  getCpfOrCnpj(){
    this.cpf = undefined;
    this.cnpj = undefined;
    let value = this.registerForm.get('cpforcnpj')?.value.replaceAll('.','').replaceAll('/','').replaceAll('-','')
    let alreadyRegistered = this.info.isUserAlreadyRegistered(value)
    console.log(value.length)
    if (value.length == 0) this.showModal('Insira seu CPF ou CNPJ')
    else if (alreadyRegistered){
          this.showModal('Usuário já cadastrado.', 'Faça seu login')
          setTimeout(() => {
            localStorage.setItem('uar',value)
            window.location.href = ''
          },3000)
    } else if (value.length != 11 && value.length != 14) this.showModal('CPF ou CNPJ inválido')
    else {
      console.log(value)
      if (value.length == 11 && this.register.isCpfValid(value)){
        this.cpf = value
        this.registerForm.get('registerPF')?.patchValue({
        cpfcnpj: this.cpf
        })
      } else if (value.length == 14 && this.register.isCnpjValid(value)) {
        this.cnpj = value
        this.registerForm.get('registerPJ')?.patchValue({
        cpfcnpj: this.cnpj
        })
      } else  this.showModal('CPF ou CNPJ inválido2')
    }
    

    // switch (value.length) {
    //   case 0:
    //     this.showModal('Insira seu CPF ou CNPJ')
    //     break
    //   case 11:
    //     let cpfValid = this.register.isCpfValid(value)
    //     if(cpfValid && !alreadyRegistered){
    //     this.cpf = value.replaceAll('.','').replaceAll('-','');
    //     console.log('é cpf')
    //     this.registerForm.get('registerPF')?.patchValue({
    //       cpf: this.cpf
    //     })
    //   } else if(alreadyRegistered){
    //     this.showModal('Usuário já cadastrado.', 'Faça seu login')
    //     setTimeout(() => {
    //       localStorage.setItem('uar',value)
    //       window.location.href = ''
    //     },3000)
        
    //   } else {
    //     this.showModal('CPF Inválido !')
    //   }
    //     break
    //   case 14:
    //     console.log('é cnpj')
    //     let cnpjValid = this.register.isCnpjValid(value)
    //     if(cnpjValid && !alreadyRegistered){
    //       this.cnpj = value;
    //       this.registerForm.get('registerPJ')?.patchValue({
    //         cnpj: value.replaceAll('.','').replaceAll('/','').replaceAll('-','')
    //       })
    //     } else if(alreadyRegistered){
    //       this.showModal('Usuário já cadastrado.', 'Faça seu login')
    //       setTimeout(() => {
    //         localStorage.setItem('uar',value)
    //         window.location.href = ''
    //       },3000)
    //     } else {
    //       this.showModal('CNPJ Inválido !')
    //   }
    //     break
    //   default:
    //     this.showModal('CPF ou CNPJ inválido')
    // }
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
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
    } else if (createPassword.length < 4){
      this.showModal('Sua senha deve conter pelo menos 4 caracteres')
    } else if (confirmPassword.length == 0){
      this.showModal('Por favor confirme sua senha')
    } else {
      this.showModal('Senhas não coincidem. Tente novamente')
    }
  }

  viewTerms(){
    let msg = 'Software Web desenvolvido para o Projeto Integrador II da Universidade Virtual do Estado de São Paulo (UNIVESP), sinta-se à vontade para experimentar nossa plataforma.'
    this.showModal(msg,'Aceito','Termos de Uso')
    this.registerForm.patchValue({
      accept: true
    })
  }

  treatingInfo(){
    let name = this.registerForm.get('registerPF')?.get('nome')?.value.toLowerCase();
    let birthDate = this.registerForm.get('registerPF')?.get('dataNascimento')?.value.split('/');
    console.log(birthDate)
    this.registerForm.get('registerPF')?.patchValue({
      nome: name,
      data_nascimento: birthDate.reverse().join('-')
    });
    let corporateName = this.registerForm.get('registerPJ')?.get('nome')?.value.toLowerCase();
    let tradeName = this.registerForm.get('registerPJ')?.get('contatoNome')?.value.toLowerCase();
    let startDate = this.registerForm.get('registerPJ')?.get('data_criacao')?.value.split('/');
    console.log(startDate)
    this.registerForm.get('registerPJ')?.patchValue({
      nome: corporateName,
      contatoNome: tradeName,
      dataCriacao: startDate.reverse().join('-')
    });
  }

  createUser(){
    if(this.cpf && (this.registerForm.get('registerPF')?.invalid || 
    !this.birthValid(this.registerForm.get('registerPF')?.get('dataNascimento')?.value))){
      console.log('moiou')
      this.showModal('Erro ao realizar cadastro','OK','Verifique suas informações',)
    } else if(this.cnpj  && (this.registerForm.get('registerPJ')?.invalid ||
    !this.dateValid(this.registerForm.get('registerPJ')?.get('data_criacao')?.value))){
      console.log('moiou')
      console.log(this.cnpj)
      this.showModal('Erro ao realizar cadastro','OK','Verifique suas informações',)
    }else if(!this.registerForm.get('accept')?.valid) {
      this.showModal('Você precisa aceitar os termos de uso.')
    } else {
    this.treatingInfo()
    // let bodyPF = this.registerForm.get('registerPF');
    // console.log(bodyPF)
    // let bodyPJ = this.registerForm.get('registerPJ');
    let body = this.registerForm.get('registerPF')?.valid ?
    this.registerForm.get('registerPF') :
    this.registerForm.get('registerPJ')

    if(body?.valid){
      console.log(body.value)
    }
    // if(bodyPF?.valid){
      this.register.createUser(body?.value).subscribe({
        next: () => {
            console.log('usou o createconsumer');
            console.log(body?.value)
            console.log(body?.valid)
            alert('Usuário cadastrado com sucesso');
            this.registerForm.reset();
            this.router.navigate(['/'])
          },
          error: err => {
            console.log('nao enviado', err)
            this.showModal(`Erro ao realizar cadastro ${err.status}`)
        }
        }
      )
    // } else if(bodyPJ?.valid){
    //   this.register.createCorporate(bodyPJ?.value).subscribe({
    //     next: () => {
    //         console.log('usou o createcorporate');
    //         console.log(bodyPJ?.value)
    //         console.log(bodyPJ?.valid)
    //         alert('Empresa cadastrada com sucesso');
    //         this.registerForm.reset();
    //         this.router.navigate(['/'])
    //     },
    //     error: err => {
    //       console.log('nao enviado', err)
    //       this.showModal(`Erro ao realizar cadastro ${err.status}`)
    //   }
    // })
    // }
  }
  }
}
