import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';

  constructor(private info: LoginService) { }

  ngOnInit(): void {
    this.UserLogged()
  }

  UserLogged(){
    this.info.getConsumer().subscribe(
      data => {
        let fullName = data.nome.split(" ");
        this.firstName = fullName[0];
        this.lastName = fullName[fullName.length-1]
      }
    )
  }

}
