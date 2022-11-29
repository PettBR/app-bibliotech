import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CadastrarLivrosService } from 'src/app/services/cadastrar-livros.service';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public livros: Livro[] = [];
  public formEmprestimo!: FormGroup;
  
  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
    private router: Router,
    private cadastrarLivroService: CadastrarLivrosService
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
    this.initiateTable()
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

  public initiateTable(): void {
    this.cadastrarLivroService.findAll().subscribe(resposta => {
      this.livros = resposta
    })
  }

}


