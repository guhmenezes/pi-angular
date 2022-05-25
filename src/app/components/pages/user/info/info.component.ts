import { Component, Input, OnInit } from '@angular/core';
import { UserPF } from 'src/app/models/userPF';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user!: UserPF;
  nome!: string;
  email!: string;
  telefone!: string;


  constructor(private info: LoginService, private reg: RegisterService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.info.getConsumer()?.subscribe({
      next: (data:any) => {
        this.user = data;
        this.nome = data.nome.toUpperCase();
        this.email = data.email;
        this.telefone = data.telefone
        console.log(data);
        console.log(this.user)
      }
    })
  }

  updateData():void{
    this.user.email = this.email;
    this.user.telefone = this.telefone;
    this.reg.editConsumer(this.user.cpf, this.user)
    console.log(this.user)
  }
}
