import { Livro } from "./livro";

export interface Emprestimo {
    id?: string
    nome: string;
    email: string;
    telefone: string;
    status: string;
    livro: Livro;
    dataDeEmprestimo: Date;
}

