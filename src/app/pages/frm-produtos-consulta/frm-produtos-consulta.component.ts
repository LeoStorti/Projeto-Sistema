// src/app/components/frm-produtos-consulta/frm-produtos-consulta.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../services/produtos.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-frm-produtos-consulta',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './frm-produtos-consulta.component.html',
  styleUrls: ['./frm-produtos-consulta.component.css']
})

export class FrmProdutosConsultaComponent implements OnInit {
navigateToCadastro(arg0: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['productId', 'nomeProduto', 'fornecedor', 'quantidade'];
  dataSource = new MatTableDataSource<Produto>();
  filtroNome: string = '';
  registroSelecionado: Produto | null = null;


  constructor(private router: Router, private produtosService: ProdutosService, private http: HttpClient) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  onTabChange(event: any) {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmprodutoscadastro']);
    } else if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmprodutosconsulta']);
    }
  }
  aplicarFiltro() {
    if (!this.filtroNome) {
      this.carregarProdutos(); // Mostrar todos os produtos se o filtro estiver vazio
      return;
    }

    // Filtrar os produtos pelo nome localmente (opcional)
    this.dataSource.filter = this.filtroNome.trim().toLowerCase();

  }

  limparFiltro() {
    this.filtroNome = ''; // Limpar o filtro
    this.carregarProdutos(); // Recarregar os dados originais da API
  }

  carregarProdutos(): void {
    this.http.get<Produto[]>('https://localhost:7219/api/produtos')
      .subscribe((data: Produto[]) => {
        this.dataSource.data = data;
      }, (error: any) => {
        console.error('Erro ao carregar produtos', error);
      });
  }
  selecionarRegistro(registro: Produto) {
    this.registroSelecionado = registro;
    // Implemente a lógica de ação ao selecionar, se necessário
  }

  excluirProdutoSelecionado() {
    if (this.registroSelecionado) {
      const id = this.registroSelecionado.productId; // Ou o ID correspondente
      this.produtosService.excluirProduto(id).subscribe(
        () => {
          console.log('Produto excluído com sucesso.');
          this.carregarProdutos(); // Recarregar os produtos após a exclusão
        },
        error => {
          console.error('Erro ao excluir o produto:', error);
          // Tratar o erro conforme necessário
        }
      );
    } else {
      console.warn('Nenhum produto selecionado para excluir.');
    }
  }
}
