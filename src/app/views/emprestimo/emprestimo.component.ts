import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
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
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: [""],
      livro: [""]
    });
  }

  ngOnInit(): void {
  }

  public cadastrarEmprestimo():void {
    if(this.formEmprestimo.valid) {
      const emprestimo: Emprestimo = this.formEmprestimo.value
      emprestimo.dataDeEmprestimo =  new Date()
      this.emprestimoService.cadastrarEmprestimo(emprestimo).subscribe(resposta=> {
        this.notification.showMessage("Empréstimo cadastrado com sucesso!")
        this.router.navigate(["/dashboard"])
      }
        )
    }else {
      this.notification.showMessage("Erro ao cadastrar empréstimo.")
    }
  }

}


