import { Livro } from "./livro";

export interface Emprestimo {
    nome: string;
    email: string;
    telefone: string;
    status: string;
    livro: Livro;
    dataDeEmprestimo: Date;
}

