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

  public listarEmprestimo():Observable<any> {
    const promessa = this.firestore.collection('emprestimos').get()
    return from(promessa).pipe(
      map((resposta: any)=> {
        return resposta.docs.map((doc: any) => {
          const emprestimo: Emprestimo = doc.data() as Emprestimo
          emprestimo.id = doc.id;
          emprestimo.dataDeEmprestimo = new Date()
          return emprestimo
        })
      }),

      catchError(error => {
        this.notification.showMessage("Erro ao buscar empréstimos.")
        console.error(error)
        return EMPTY
      })
    )
  }

  public deleteEmprestimo(id: string) {
    const promise = this.firestore.collection("emprestimos").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

}
