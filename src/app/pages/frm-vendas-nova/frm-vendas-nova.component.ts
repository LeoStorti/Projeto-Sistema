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
import { MatSnackBar } from '@angular/material/snack-bar';


export interface ProdutoVenda {
  nomeProduto: string;
  quantidade: number;
  valorUnitario: number;
  valorDeVenda: number;
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
  displayedColumns: string[] = ['nomeProduto', 'quantidade', 'valorUnitario', 'actions'];
  dataSource = new MatTableDataSource<ProdutoVenda>();
  venda: Venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' };
  activeTabIndex = 1;
  clientes: Clientes[] = [];
  produtosDisponiveis: Produto[] = [];
  clienteSelecionado: Clientes | undefined;
  produtoSelecionado: ProdutoVenda | undefined;

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
      this.venda.produtos.push({ ...this.produtoSelecionado });
      this.dataSource.data = [...this.venda.produtos];
      this.produtoSelecionado = undefined; // Limpar o produto selecionado após adicionar à lista
    }
  }

  removerProduto(index: number): void {
    this.venda.produtos.splice(index, 1);
    this.dataSource.data = this.venda.produtos;
  }

  // Adicione uma função para verificar o estoque disponível antes de salvar a venda
verificarEstoqueDisponivel(): boolean {
  for (const produto of this.venda.produtos) {
    const produtoDisponivel = this.produtosDisponiveis.find(p => p.productId === produto.productId);
    if (produtoDisponivel && produto.quantidade > produtoDisponivel.quantidade) {
      alert(`A quantidade solicitada para o produto ${produto.nomeProduto} é maior que o disponível no estoque.`);
      return false;
    }
  }
  return true;
}

async salvarVenda(): Promise<void> {
  let hasError = false;

  try {
    // Itera sobre cada produto na venda
    for (const produto of this.venda.produtos) {
      const response = await this.http.get(`https://localhost:7219/api/produtos/${produto.productId}`).toPromise();
      const produtoEmEstoque = response as Produto;

      if (produtoEmEstoque.quantidade < produto.quantidade) {
        hasError = true;
        const mensagemErro = `A quantidade solicitada para o produto ${produto.nomeProduto} é maior que o disponível no estoque. A quantidade atual para esse produto é ${produtoEmEstoque.quantidade}.`;
        this.snackBar.open(mensagemErro, 'Fechar', { duration: 5000 }); // Exibir mensagem de snackbar
      }
    }

    if (!hasError) {
      // Continua com a lógica para salvar a venda
      for (const produto of this.venda.produtos) {
        const novaVenda = {
          vendas_Id: this.venda.vendas_Id,
          nf: this.venda.nf,
          clienteId: this.venda.clienteId,
          produtos_Nome: produto.nomeProduto,
          quantidade: produto.quantidade, // Inclua a quantidade aqui
          valorDeVenda: produto.valorDeVenda
        };

        const response = await this.http.post('https://localhost:7219/api/vendas', novaVenda).toPromise();
        console.log('Venda salva com sucesso', response);
      }

      this.cancelar(); // Finaliza o processo de venda
    }
  } catch (error) {
    hasError = true;
    console.error('Erro ao processar venda:', error);
    this.snackBar.open('Erro ao processar venda.', 'Fechar', { duration: 5000 }); // Exibir mensagem de erro ao salvar a venda
  }
}



  cancelar(): void {
    this.venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos: [], numero_Pedido: '' };
    this.dataSource.data = this.venda.produtos;
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmvendasconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmvendasnova']);
    }
  }
}
