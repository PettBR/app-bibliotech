import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from './notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Livro } from '../models/livro';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastrarLivrosService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createLivro(livro: Livro): Observable<any> {
    const promise = this.firestore.collection("livros").add(livro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar novo livro.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
