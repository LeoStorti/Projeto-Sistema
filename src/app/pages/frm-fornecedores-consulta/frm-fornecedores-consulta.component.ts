import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FornecedorService } from '../../services/fornecedor.service';
import { AuthService } from '../../services/auth.service';


export interface Fornecedor {
  id: number;
  nome: string;
  contato: string;
  endereco: string;
}

@Component({
  selector: 'app-frm-fornecedores-consulta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './frm-fornecedores-consulta.component.html',
  styleUrls: ['./frm-fornecedores-consulta.component.css']
})
export class FrmFornecedoresConsultaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'contato', 'endereco'];
  dataSource = new MatTableDataSource<Fornecedor>();
  filtroNome: string = '';
  fornecedorSelecionado: Fornecedor | null = null;
  userName: string = '';
  loginTime: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private fornecedoresService: FornecedorService,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.carregarFornecedores();
    this.userName = this.authService.getLogin() || 'Usuário Desconhecido';
    this.loginTime = this.authService.getSessionDuration();
  }

  carregarFornecedores(): void {
    this.http.get<Fornecedor[]>('https://localhost:7219/api/fornecedores')
      .subscribe((data: Fornecedor[]) => {
        this.dataSource.data = data;
      }, error => {
        console.error('Erro ao carregar fornecedores', error);
      });
  }

  navigateToCadastro(fornecedorId: number): void {
    console.log('Navigating to cadastro with fornecedorId:', fornecedorId);
    this.router.navigate(['/frmfornecedorescadastro', fornecedorId]);
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtroNome.trim().toLowerCase();
  }

  limparFiltro(): void {
    this.filtroNome = '';
    this.dataSource.filter = '';
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmfornecedoresconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmfornecedorescadastro']);
    }
  }

  selecionarRegistro(registro: Fornecedor): void {
    this.fornecedorSelecionado = registro;
    // Implemente a lógica de ação ao selecionar, se necessário
  }

  excluirFornecedorSelecionado(): void {
    if (this.fornecedorSelecionado) {
      const id = this.fornecedorSelecionado.id; // Ajuste para o campo ID correto
      this.fornecedoresService.excluirFornecedor(id).subscribe(
        () => {
          console.log('Fornecedor excluído com sucesso.');
          this.carregarFornecedores(); // Recarregar os fornecedores após a exclusão
        },
        error => {
          console.error('Erro ao excluir o fornecedor:', error);
          // Tratar o erro conforme necessário
        }
      );
    } else {
      console.warn('Nenhum fornecedor selecionado para excluir.');
    }
  }
}
