import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

export interface ProdutoVenda {
  nomeProduto: string;
  quantidade: number;
  valorDeVenda?: number;
  productId?: number;
}

export interface Venda {
  vendas_Id: number;
  nf: string;
  clienteId: number;
  valorDeVenda: string;
  produtos: ProdutoVenda[];
  numero_Pedido: string;
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
  displayedColumns: string[] = ['clienteId', 'nomeCliente', 'cnpjCliente', 'enderecoCliente', 'telefoneCliente'];
  dataSource = new MatTableDataSource<Venda>();
  venda: Venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' };
  activeTabIndex = 1;
  clientes: Clientes[] = [];
  produtosDisponiveis: Produto[] = [];
  clienteSelecionado: Clientes | undefined;
  produtoSelecionado: Produto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clientesService: ClientesService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeTabIndex = params.has('id') ? 1 : 0;
    });
    this.activeTabIndex = 1;
    this.carregarTodasVendas();
    this.carregarClientes();
    this.carregarProdutosDisponiveis();
  }

  carregarTodasVendas(): void {
    this.http.get<Venda[]>('https://localhost:7219/api/vendas').subscribe((data: Venda[]) => {
      this.dataSource.data = data;
    }, error => {
      console.error('Erro ao carregar todas as vendas', error);
    });
  }

  carregarClientes(): void {
    this.clientesService.getClientes().subscribe((data: Clientes[]) => {
      console.log('Clientes carregados:', data);
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
    this.venda.clienteId = cliente.clienteId;  // Atualiza o clienteId da venda
  }

  selecionarProduto(produto: Produto): void {
    this.produtoSelecionado = produto;
  }

  salvarVenda(): void {
    this.http.post('https://localhost:7219/api/vendas', this.venda).subscribe(response => {
      this.carregarTodasVendas();
      this.cancelar();
    }, error => {
      console.error('Erro ao salvar venda', error);
    });
  }

  cancelar(): void {
    this.venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' };
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmvendasconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmvendasnova']);
    }
  }

  adicionarProduto(): void {
    if (this.produtoSelecionado) {
      this.venda.produtos.push({
        nomeProduto: this.produtoSelecionado.nomeProduto,
        quantidade: this.produtoSelecionado.quantidade,
        valorDeVenda: this.produtoSelecionado.valorDeVenda,
        productId: this.produtoSelecionado.productId
      });
    }
  }

  removerProduto(index: number): void {
    this.venda.produtos.splice(index, 1);
  }
}
