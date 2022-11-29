import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['leitor', 'livro', 'dataDeEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Emprestimo[] = [];


  constructor(
    private notification: NotificationService,
    private dialog: MatDialog,
    private emprestimoService: EmprestimoService

  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  public initializeTable(): void {
    this.emprestimoService.listarEmprestimo().subscribe(resposta =>{
      console.log(resposta)
      this.dataSource = resposta
    })
  }

  public deleteEmprestimo(id: string): void {
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(livro: Livro): void {
    // Abrir Caixa de diálogo com informações do livro
    this.dialog.open(DetailsComponent, {
      width: "48vw",
      height: "400px",
      data: livro
    })

  }

}
