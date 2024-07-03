import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fornecedor {
  id: number;
  nome: string;
  contato: string;
  endereco: string;
}

export interface Produto {
  id: number;
  nome: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = 'https://localhost:7219/api'; // Substitua pelo caminho correto da sua API

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.apiUrl}/fornecedores`);
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos`);
  }

// Método para excluir um Fornecedor pelo ID
  excluirFornecedor(id: number): Observable<any> {
   const url = `${'https://localhost:7219/api/Fornecedores'}/${id}`;
    return this.http.delete(url);
  }

}
