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

  constructor(private info: LoginService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.info.getConsumer()?.subscribe({
      next: (users:any) => {
        this.user = users
        console.log(users);
      }
    })
  }
}
