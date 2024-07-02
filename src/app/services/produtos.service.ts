import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Produto {
  productId: number;
  nomeProduto: string;
  fornecedor: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'https://localhost:7219/api';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

    // Método para excluir um produto pelo ID
    excluirProduto(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url);
    }

    atualizarProduto(produto: Produto): Observable<any> {
      const url = `${this.apiUrl}/${produto.productId}`;
      return this.http.put(url, produto);
    }

    adicionarProduto(produto: Produto): Observable<any> {
      return this.http.post(this.apiUrl+'/Produtos', produto);
    }

    getProdutosByFornecedorId(id: number): Observable<any> {
      // Lógica para chamar a API e retornar os produtos
      return this.http.get<any>(`/api/fornecedores/${id}`);
    }
}
