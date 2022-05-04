import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginUser = fb.group({
      login: '',
      password: ''
    })
   }

  ngOnInit(): void {
  }

}
