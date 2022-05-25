import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  newConsumer!: string;

  constructor(private reg: RegisterService) { }

  ngOnInit(): void {
  }

  generateCard():void{
    let body = {
      promocaoId: "54e29ab9-cd28-4575-91b4-500d2325a650",
      cpf: "05264023697"
    }
    this.reg.createCard(body).subscribe(
      response => console.log(response)
    )
  }

}
