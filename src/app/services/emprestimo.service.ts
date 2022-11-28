import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Leitor } from '../models/leitor';
import { NotificationService } from './notification.service';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createEmprestimo(leitor: Leitor): Observable<any> {
    const promise = this.firestore.collection("emprestimos").add(leitor);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
