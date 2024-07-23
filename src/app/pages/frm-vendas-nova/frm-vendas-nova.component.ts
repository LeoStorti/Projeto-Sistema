import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService, Clientes } from '../../services/clientes.service';
import { ProdutosService, Produto } from '../../services/produtos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Itens_Venda {
  nomeProduto: string;
  quantidade: number;
  valorUnitario: number;
  valorDeVenda: number;
  productId?: number;
}

export interface Venda {
  vendas_Id: number;
  clienteId: number;
  itens_Venda: Itens_Venda[];
}

@Component({
  selector: 'app-frm-vendas-nova',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './frm-vendas-nova.component.html',
  styleUrls: ['./frm-vendas-nova.component.css']
})
export class FrmVendasNovaComponent implements OnInit {
  displayedColumns: string[] = ['nomeProduto', 'quantidade', 'valorUnitario', 'actions'];
  dataSource = new MatTableDataSource<Itens_Venda>();
  venda: Venda = { vendas_Id: 0, clienteId: 0, itens_Venda: [] }; // Atualize para `itens_Venda`
  activeTabIndex = 1;
  clientes: Clientes[] = [];
  produtosDisponiveis: Produto[] = [];
  clienteSelecionado: Clientes | undefined;
  produtoSelecionado: Itens_Venda | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeTabIndex = params.has('id') ? 1 : 0;
    });
    this.carregarClientes();
    this.carregarProdutosDisponiveis();
  }

  carregarClientes(): void {
    this.clientesService.getClientes().subscribe((data: Clientes[]) => {
      this.clientes = data;
    }, error => {
      console.error('Erro ao carregar clientes', error);
    });
  }

  carregarProdutosDisponiveis(): void {
    this.produtosService.getProdutos().subscribe((data: Produto[]) => {
      this.produtosDisponiveis = data;
    }, error => {
      console.error('Erro ao carregar produtos disponíveis', error);
    });
  }

  selecionarCliente(cliente: Clientes): void {
    this.clienteSelecionado = cliente;
    this.venda.clienteId = cliente.clienteId; // Atualiza o clienteId da venda
  }

  selecionarProduto(produto: Produto): void {
    this.produtoSelecionado = {
      nomeProduto: produto.nomeProduto,
      quantidade: 1, // Default quantity
      valorUnitario: produto.valorDeVenda,
      valorDeVenda: produto.valorDeVenda, // Inicialmente igual ao valor unitário
      productId: produto.productId
    };
  }

  adicionarProduto(): void {
    if (this.produtoSelecionado) {
      this.venda.itens_Venda.push({ ...this.produtoSelecionado });
      this.dataSource.data = [...this.venda.itens_Venda];
      this.produtoSelecionado = undefined; // Limpar o produto selecionado após adicionar à lista
    }
  }

  removerProduto(index: number): void {
    this.venda.itens_Venda.splice(index, 1);
    this.dataSource.data = this.venda.itens_Venda;
  }

  async salvarVenda(): Promise<void> {
    try {
      const novaVenda = {
        vendas_Id: this.venda.vendas_Id,
        clienteId: this.venda.clienteId,
        itens_Venda: this.venda.itens_Venda.map(produto => ({
          produtoId: produto.productId,
          quantidade: produto.quantidade,
          valorDeVenda: produto.valorDeVenda
        }))
      };

      const response = await this.http.post('https://localhost:7219/api/vendas', novaVenda).toPromise();
      console.log('Venda salva com sucesso', response);

      this.snackBar.open('Venda salva com sucesso!', 'Fechar', { duration: 5000 });
      this.cancelar();
    } catch (error) {
      console.error('Erro ao salvar venda:', error);

      if (error instanceof HttpErrorResponse && error.status === 400 && error.error && error.error.errors) {
        const validationErrors = error.error.errors;
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            this.snackBar.open(validationErrors[key], 'Fechar', { duration: 5000 });
          }
        }
      } else {
        this.snackBar.open('Erro ao salvar a venda. Tente novamente.', 'Fechar', { duration: 5000 });
      }
    }
  }


  cancelar(): void {
    this.router.navigate(['/frmclientescadastro']);
  }

  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
  }
}
