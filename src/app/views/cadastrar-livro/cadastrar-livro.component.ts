import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livro } from 'src/app/models/livro';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.css']
})
export class CadastrarLivroComponent implements OnInit {

  public formCadastro: FormGroup;

    displayedColumns = ['titulo', 'categoria', 'autor', 'isbn'];
    dataSource: Livro[] = [
      {titulo:"titulo-teste", categoria:"categoria-teste",autor:"autor-teste", isbn:"000-000-000-AA", status: "recebido"}
    ];

  constructor(
    fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.formCadastro = fb.group({
      titulo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      capaUrl: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
    });

  }

  ngOnInit(): void {
  }

}