import { Livro } from "./livro";

export interface Leitor {
    nome: string;
    email: string;
    livro: Livro;
    dataDeEmprestimo: Date;
}

