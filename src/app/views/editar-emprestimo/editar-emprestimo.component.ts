import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo!: Emprestimo;
  public livros: Livro[] = [];

  constructor(
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeFields()
  }

  private initializeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.emprestimoService.findById(id).subscribe(emprestimo => {
      this.emprestimo = emprestimo;
    })
  }

  public updateEmprestimo(form: NgForm): void {
    if(form.valid) {
      this.emprestimoService.updateEmprestimo(this.emprestimo).subscribe(response => {
        this.notification.showMessage("Empréstimo atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }



}



