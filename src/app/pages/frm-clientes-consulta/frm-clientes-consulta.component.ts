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
import { ClientesService } from '../../services/clientes.service';

export interface Clientes {
  ClienteId: number;
  NomeCliente: string;
  CNPJCliente: string;
  EnderecoCliente: string;
  TelefoneCliente: string;
}

@Component({
  selector: 'app-frm-clientes-consulta',
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
  templateUrl: './frm-clientes-consulta.component.html',
  styleUrls: ['./frm-clientes-consulta.component.css']
})
export class FrmClientesConsultaComponent implements OnInit {
  displayedColumns: string[] = ['ClienteId', 'NomeCliente', 'CNPJCliente', 'EnderecoCliente','TelefoneCliente'];
  dataSource = new MatTableDataSource<Clientes>();
  filtroNome: string = '';
  clientesSelecionado: Clientes | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.http.get<Clientes[]>('https://localhost:7219/api/clientes')
      .subscribe((data: Clientes[]) => {
        this.dataSource.data = data;
      }, error => {
        console.error('Erro ao carregar clientes', error);
      });
  }

  navigateToCadastro(clientesId: number): void {
    console.log('Navigating to cadastro with clientesId:', clientesId);
    this.router.navigate(['/frmclientescadastro', clientesId]);
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
      this.router.navigate(['/frmclientesconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmclientescadastro']);
    }
  }

  selecionarRegistro(registro: Clientes): void {
    this.clientesSelecionado = registro;
    // Implemente a lógica de ação ao selecionar, se necessário
  }

  excluirClienteSelecionado(): void {
    if (this.clientesSelecionado) {
      const id = this.clientesSelecionado.ClienteId; // Ajuste para o campo ID correto
      this.clientesService.excluirClientes(id).subscribe(
        () => {
          console.log('Fornecedor excluído com sucesso.');
          this.carregarClientes(); // Recarregar os fornecedores após a exclusão
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
