import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  dataValidade!: string;
  qtdCarimbo!: string;
  descricao!: string;

  constructor(private reg: RegisterService) { }

  ngOnInit(): void {
  }

  createPromo():void{
    let body = {
      empresaId: "76e29ab9-cd28-4575-91b4-500d2325a650",
      dataValidade: "2022-06-01",
      qtdCarimbo: 10,
      descricao: "A cada 10 visitas ganhe um cappucino"
    }
    this.reg.createPromo(body).subscribe(
      response => console.log(response)
    )
  }
}
