import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarLivroComponent } from './views/cadastrar-livro/cadastrar-livro.component';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { EmprestimoComponent } from './views/emprestimo/emprestimo.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Home | Bibliotech",
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent,
    title: "Cadastro de Usuário | Bibliotech"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: "Painel de Controle | Bibliotech",
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/emprestimo',
    component: EmprestimoComponent,
    title: "Empréstimo de Livro | Bibliotech",
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dashboard/editar/:id',
    component: EditarEmprestimoComponent,
    title: "Editar Empréstimo de Livro | Bibliotech",
    canActivate: [ AuthGuard ]
  },
  {
    path: 'cadastrar-livro',
    component: CadastrarLivroComponent,
    title: "Cadastro de Livros | Bibliotech",
    canActivate: [ AuthGuard ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
