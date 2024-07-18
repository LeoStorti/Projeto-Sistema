import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produtos.service';

export interface Fornecedor {
nomeFornecedor: any;
  fornecedor_Id: number;
  id: number;
  nome: string;
  contato: string;
  endereco: string;
  valorDeVenda: number;
  valorDeCompra: number;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = 'https://localhost:7219/api'; // Substitua pelo caminho correto da sua API
  nomeFornecedor: any;

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
