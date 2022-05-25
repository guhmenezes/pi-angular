import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {

  cpf!: string;
  qtd!: number;

  constructor(private reg: RegisterService) { }

  ngOnInit(): void {
  }
  stampCard():void{
    let body = {
      promocaoId: "54e29ab9-cd28-4575-91b4-500d2325a650",
      cpf: "05264023697",
      qtdCarimbos: "5"
    }
    this.reg.stampCard(body).subscribe(response => console.log(response))
  }
}
