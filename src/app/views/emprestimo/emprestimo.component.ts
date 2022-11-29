import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Leitor } from 'src/app/models/leitor';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup;

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
    private router: Router
  ) {
    this.formEmprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required], [Validators.email]],
      telefone: ["", [Validators.required]],
      status: [""],
      livro: [""]
    });
  }

  ngOnInit(): void {
  }

  public createEmprestimo(): void {
    if (this.formEmprestimo.valid) {
      const leitor: Leitor = this.formEmprestimo.value;

      // Enviar para o BANCO DE DADOS
      this.emprestimoService.createEmprestimo(leitor).subscribe(response => {
        console.log(leitor);
        this.notification.showMessage("Empréstimo cadastrado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    } else {
      this.notification.showMessage("Dados inválidos.")
    }
  }

}


