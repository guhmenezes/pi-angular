import { Component, Input, OnInit } from '@angular/core';
import { UserPF } from 'src/app/models/userPF';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  users: UserPF[] = [];

  constructor(private register: RegisterService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.register.getAllConsumers().subscribe({
      next: users => {
        this.users = users;
        console.log(users);
      }
    })
  }
}
