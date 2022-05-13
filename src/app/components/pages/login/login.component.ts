import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { UserPF } from 'src/app/models/userPF';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login();

  constructor(private loginService: LoginService) {
   }

  ngOnInit(): void {
  }

  login(){
    try{
    this.loginService.getConsumer(this.user.login!).subscribe({
      next: response => {
        const userRegistered = response
        this.loginService.login(this.user, userRegistered)
      },
      error: err => console.log('Error', err)

    }
    )
    console.log(this.user)
  } catch (e) {
    alert('Not Found')
  }
  }

}
