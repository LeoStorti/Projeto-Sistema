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
import { MatButtonModule } from '@angular/material/button';


export interface Produto {
  nome: string;
  preco: number;
  quantidade: number;
  ValorDeVenda?: number; // Adicionado campo valorVenda
}

export interface Venda {
  vendas_Id: number;
  nf: string;
  clienteId: number;
  valorDeVenda: string;
  produtos: Produto[];
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
  venda: Venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' }; // Inicializado produtos como um array vazio
  activeTabIndex = 1;
  clientes: Clientes[] = [];
  produtosDisponiveis: Produto[] = [];
  produtoSelecionado: Produto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeTabIndex = params.has('id') ? 1 : 0; // Define o índice da aba ativa com base na presença do parâmetro 'id'
    });
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
      console.log('Clientes carregados:', data); // Log dos dados recebidos
      this.clientes = data;

      // Logar cada cliente individualmente para inspeção
      this.clientes.forEach(cliente => {
        console.log('clienteId:', cliente.clienteId, 'nomeCliente:', cliente.nomeCliente);
      });

    }, error => {
      console.error('Erro ao carregar clientes', error);
    });
  }

  carregarProdutosDisponiveis(): void {
    this.http.get<Produto[]>('https://localhost:7219/api/produtos').subscribe((data: Produto[]) => {
      this.produtosDisponiveis = data;
    }, error => {
      console.error('Erro ao carregar produtos disponíveis', error);
    });
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
    this.venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' }; // Resetar produtos como um array vazio
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
    this.venda.produtos.push({ nome: '', preco: 0, quantidade: 0 });
  }

  removerProduto(index: number): void {
    this.venda.produtos.splice(index, 1);
  }
}
