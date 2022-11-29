import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Emprestimo } from 'src/app/models/emprestimo';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['leitor', 'livro', 'dataDeEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Emprestimo[] = [
    {
      nome: "Felipe",
      email: "teste@mail.com",
      telefone: "987654321",
      status: "Disponível",
      livro: {titulo:"titulo-teste", autor:"autor-teste", categoria:"categoria-teste", isbn:"000-000-000-AA"},
      dataDeEmprestimo: new Date(),
    }

  ];


  constructor(
    private notification: NotificationService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

}
