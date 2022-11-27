import { Component, OnInit } from '@angular/core';
import { Leitor } from 'src/app/models/leitor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['leitor', 'livro', 'dataDeEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Leitor[] = [
    {
      nome: "Felipe",
      livro: {titulo:"titulo-teste", autor:"autor-teste", categoria:"categoria-teste", isbn:"000-000-000-AA"},
      dataDeEmprestimo: new Date(),
      status: "recebido",
    },
    {
      nome: "Pedro",
      livro: {titulo:"titulo-teste2", autor:"autor-teste", categoria:"categoria-teste", isbn:"000-000-000-AA"},
      dataDeEmprestimo: new Date(),
      status: "pendente",
    }

  ];


  constructor() { }

  ngOnInit(): void {
  }

}
