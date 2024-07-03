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
import { FornecedorService } from '../../services/fornecedor.service';


export interface Produto {
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
    CommonModule
  ],
  templateUrl: './frm-fornecedores-cadastro.component.html',
  styleUrls: ['./frm-fornecedores-cadastro.component.css']
})
export class FrmFornecedoresCadastroComponent implements OnInit {
  fornecedorId!: number;
  fornecedor: any = {};
  produtos: Produto[] = [];
  displayedColumns: string[] = ['productId', 'nomeProduto', 'fornecedor', 'quantidade'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fornecedoresService: FornecedorService

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fornecedorId = +params.get('id')!;
      console.log('Fornecedor ID:', this.fornecedorId); // Log para verificar se o ID está correto
      if (this.fornecedorId) {
        this.carregarDadosFornecedor(this.fornecedorId);
      }
    });
    this.carregarTodosProdutos();
  }

  carregarDadosFornecedor(id: number): void {
    console.log('Carregando dados do fornecedor com ID:', id); // Log para verificar a chamada da API
    this.fornecedoresService.getFornecedorById(id).subscribe((data: any) => {
      console.log('Dados do fornecedor carregados:', data); // Log para verificar os dados carregados
      this.fornecedor = data;
      this.produtos = data.produtos || [];
    }, error => {
      console.error('Erro ao carregar dados do fornecedor', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  carregarTodosProdutos(): void {
    console.log('Carregando todos os produtos'); // Log para verificar a chamada da API
    this.http.get<Produto[]>(`https://localhost:7219/api/produtos`).subscribe((data: Produto[]) => {
      console.log('Todos os produtos carregados:', data); // Log para verificar os dados carregados
      this.produtos = data;
    }, error => {
      console.error('Erro ao carregar todos os produtos', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmfornecedoresconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmfornecedorescadastro']);
    }
  }
}
