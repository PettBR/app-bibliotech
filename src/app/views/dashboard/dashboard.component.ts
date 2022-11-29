import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Leitor } from 'src/app/models/leitor';
import { NotificationService } from 'src/app/services/notification.service';

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
      email: "teste@mail.com",
      dataDeEmprestimo: new Date()
    },
    {
      nome: "Pedro",
      livro: {titulo:"titulo-teste2", autor:"autor-teste", categoria:"categoria-teste", isbn:"000-000-000-AA"},
      email: "teste2@mail.com",
      dataDeEmprestimo: new Date()
    }

  ];


  constructor(
    private notification: NotificationService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

}
