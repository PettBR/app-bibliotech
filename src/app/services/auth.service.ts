import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, EMPTY } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private firebaseAuth: AngularFireAuth,
    private notification: NotificationService
    ) { }

  // Método para autenticar via Google
  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    // Converter a promise em um observable
    const promise = this.firebaseAuth.signInWithPopup(provider); // Retorna uma promise
    return from(promise).pipe(
      // Operador para tratamento de erros
      catchError(error => {
        // Resposta para o usuário
        this.notification.showMessage("Erro ao autenticar com o Google");
        // Resposta para o dev
        console.error(error)
        // Retorno vazio
        return EMPTY;
      })
    ); 
  }

  authenticateByEmailAndPassword(user: User) {
    // Posso substituir esses 2:
    // const email = user.email;
    // const senha = user.senha;
    // Por essa única linha: (por ser o mesmo nome)
    const { email, senha } = user;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha);
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found") {
          this.notification.showMessage("Usuário não cadastrado.");
        } else if(error.code == "auth/wrong-password"){
          this.notification.showMessage("Senha incorreta.");
        }
        else {

          this.notification.showMessage("Erro ao autenticar");
        console.error(error);
        }
        return EMPTY;
      })
    );
  }

  createUserEmailAndPassword(user: User): Observable<any> {
    const {email, senha} = user;
    // Ainda não autentica, vai cadastrar o email e a senha:
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha);
    return from(promise).pipe(
      catchError(error => {
        alert("Erro ao cadastrar usuário.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  logout() {
    const promise = this.firebaseAuth.signOut();
    return from(promise).subscribe(response => {
    });
  }

}
