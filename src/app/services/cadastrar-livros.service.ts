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

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("livros").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const livro: Livro = doc.data() as Livro;
          livro.id = doc.id;
          return livro;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("livros").doc(id).get();
    // convertendo para o nosso formato de livro(a interface criada) - aqui precisa fazer apenas 1 camada de tratamento pq o firestore já nos manda o doc
    return from(promise).pipe(
      map(doc => {
        const livro: Livro = doc.data() as Livro;
        livro.id = doc.id;
        return livro;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY
      })
    )
  }

  public deleteLivro(id: string) {
    const promise = this.firestore.collection("livro").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateLivro(livro: Livro) {
    const promise = this.firestore.collection("livros").doc(livro.id).update(livro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
