import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livro } from 'src/app/models/livro';
import { NotificationService } from 'src/app/services/notification.service';
import { CadastrarLivrosService } from 'src/app/services/cadastrar-livros.service';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.css']
})
export class CadastrarLivroComponent implements OnInit {

  public formCadastro!: FormGroup;
  
  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource: Livro[] = []
  
  
  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private CadastrarLivrosService: CadastrarLivrosService,
    
  ) {
    this.formCadastro = fb.group({
      titulo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      capaUrl: [""]

    });
  }
  
  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.CadastrarLivrosService.findAll().subscribe(livros=> {
      this.dataSource = livros;
    });
  }

  public deleteLivro(id: string): void {
    this.CadastrarLivrosService.deleteLivro(id).subscribe(response  => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public createLivro(): void {
    if(this.formCadastro.valid) {
      const livro: Livro = this.formCadastro.value;
      this.CadastrarLivrosService.createLivro(livro).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.initializeTable();
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}