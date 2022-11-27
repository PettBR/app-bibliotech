import { Livro } from "./livro";

export interface Leitor {
    nome: string;
    livro: Livro;
    dataDeEmprestimo: Date;
    status: string;
}
