import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clientes {
  clienteId: number;
  nomeCliente: string;
  cnpjCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
}

// export interface Produto {
//   id: number;
//   nome: string;
//   quantidade: number;
// }

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://localhost:7219/api'; // Substitua pelo caminho correto da sua API

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.apiUrl}/clientes`);
  }

  // getProdutos(): Observable<Produto[]> {
  //   return this.http.get<Produto[]>(`${this.apiUrl}/produtos`);
  // }

// Método para excluir um Cliente pelo ID
  excluirClientes(id: number): Observable<any> {
   const url = `${'https://localhost:7219/api/clientes'}/${id}`;
    return this.http.delete(url);
  }

}
