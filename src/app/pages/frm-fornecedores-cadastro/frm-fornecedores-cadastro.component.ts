import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Importe o AuthService

export interface Produto {
  id: number | undefined;
  valorDeVenda: number;
  valorDeCompra: number;
  productId: number;
  nomeProduto: string;
  fornecedor: string;
  quantidade: number;
}

@Component({
  selector: 'app-frm-fornecedores-cadastro',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './frm-fornecedores-cadastro.component.html',
  styleUrls: ['./frm-fornecedores-cadastro.component.css']
})
export class FrmFornecedoresCadastroComponent implements OnInit {
  fornecedorId!: number;
  fornecedor: any = {};
  produtos: Produto[] = [];
  displayedColumns: string[] = ['productId', 'nomeProduto', 'fornecedor', 'quantidade'];
  activeTabIndex = 1; // Definir a aba ativa como "Cadastro"
  userName: string = '';
  loginTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public authService: AuthService // Injete o AuthService

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fornecedorId = +params.get('id')!;
      console.log('Fornecedor ID:', this.fornecedorId); // Log para verificar se o ID está correto
      if (this.fornecedorId) {
        this.carregarDadosFornecedor(this.fornecedorId);
      }
      // Definir a aba ativa com base no parâmetro de rota ou lógica específica
      this.activeTabIndex = this.fornecedorId ? 1 : 0;
    });
    this.carregarTodosProdutos();
  }

  carregarDadosFornecedor(id: number): void {
    console.log('Carregando dados do fornecedor com ID:', id); // Log para verificar a chamada da API
    this.http.get<any>(`https://localhost:7219/api/fornecedores/${id}`).subscribe((data: any) => {
      console.log('Dados do fornecedor carregados:', data); // Log para verificar os dados carregados
      this.fornecedor = data;
      console.log('Fornecedor atribuído:', this.fornecedor); // Log para verificar se o objeto fornecedor foi atualizado

      this.http.get<Produto[]>(`https://localhost:7219/api/produtos`).subscribe((produtosData: Produto[]) => {
        console.log('Todos os produtos carregados:', produtosData); // Log para verificar os dados carregados
        this.produtos = produtosData.filter(produto => produto.fornecedor === this.fornecedor.nome);
        console.log('Produtos filtrados:', this.produtos); // Log para verificar os produtos filtrados
      }, error => {
        console.error('Erro ao carregar todos os produtos', error);
      });
    }, error => {
      console.error('Erro ao carregar dados do fornecedor', error);
    });
  }

  carregarTodosProdutos(): void {
    console.log('Carregando todos os produtos'); // Log para verificar a chamada da API
    this.http.get<Produto[]>(`https://localhost:7219/api/produtos`).subscribe((data: Produto[]) => {
      console.log('Todos os produtos carregados:', data); // Log para verificar os dados carregados
      this.produtos = data;
    }, error => {
      console.error('Erro ao carregar todos os produtos', error);
    });
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmfornecedoresconsulta']);
    } else if (tabLabel === 'Cadastro') {
      if (this.fornecedorId) {
        this.router.navigate(['/frmfornecedorescadastro', this.fornecedorId]);
      } else {
        this.router.navigate(['/frmfornecedorescadastro']);
      }
    }
  }

  cancelar(): void {
    // Lógica para cancelar
    this.router.navigate(['/frmfornecedoresconsulta']);
  }

  salvar(): void {
    // Lógica para salvar
    if (this.fornecedorId) {
      this.http.put(`https://localhost:7219/api/fornecedores/${this.fornecedorId}`, this.fornecedor).subscribe(() => {
        console.log('Fornecedor atualizado com sucesso');
        this.router.navigate(['/frmfornecedoresconsulta']);
      }, error => {
        console.error('Erro ao atualizar fornecedor', error);
      });
    } else {
      this.http.post(`https://localhost:7219/api/fornecedores`, this.fornecedor).subscribe(() => {
        console.log('Fornecedor salvo com sucesso');
        this.router.navigate(['/frmfornecedoresconsulta']);
      }, error => {
        console.error('Erro ao salvar fornecedor', error);
      });
    }
  }
}
