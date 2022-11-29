import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from , catchError, EMPTY, Observable, map } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public cadastrarEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.collection("emprestimos").add(emprestimo);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
