import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

export interface Clientes {
  ClienteId: number;
  NomeCliente: string;
  CNPJCliente: string;
  EnderecoCliente: string;
  TelefoneCliente: string;
}

@Component({
  selector: 'app-frm-clientes-cadastro',
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
  templateUrl: './frm-clientes-cadastro.component.html',
  styleUrls: ['./frm-clientes-cadastro.component.css']
})
export class FrmClientesCadastroComponent implements OnInit {
  displayedColumns: string[] = ['ClienteId', 'NomeCliente', 'CNPJCliente', 'EnderecoCliente','TelefoneCliente'];
  dataSource = new MatTableDataSource<Clientes>();
  filtroNome: string = '';
  clienteSelecionado: Clientes | null = null;
  clienteId: number = 0;
  cliente: any = {};
  activeTabIndex = 1; // Definir a aba ativa como "Cadastro"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = +params.get('id')!;
      console.log('Cliente ID:', this.clienteId); // Log para verificar se o ID está correto
      if (this.clienteId) {
        this.carregarDadosCliente(this.clienteId);
      }
      // Definir a aba ativa com base no parâmetro de rota ou lógica específica
      this.activeTabIndex = this.clienteId ? 1 : 0;
    });
    this.carregarTodosClientes();
  }

  carregarDadosCliente(id: number): void {
    console.log('Carregando dados do cliente com ID:', id); // Log para verificar a chamada da API
    this.http.get<Clientes>(`https://localhost:7219/api/clientes/${id}`).subscribe((data: Clientes) => {
      console.log('Dados do cliente carregados:', data); // Log para verificar os dados carregados
      this.clienteSelecionado = data;
      console.log('Cliente atribuído:', this.clienteSelecionado); // Log para verificar se o objeto cliente foi atualizado
    }, error => {
      console.error('Erro ao carregar dados do cliente', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  carregarTodosClientes(): void {
    console.log('Carregando todos os clientes'); // Log para verificar a chamada da API
    this.http.get<Clientes[]>(`https://localhost:7219/api/clientes`).subscribe((data: Clientes[]) => {
      console.log('Todos os clientes carregados:', data); // Log para verificar os dados carregados
      this.dataSource.data = data;
    }, error => {
      console.error('Erro ao carregar todos os clientes', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmclientesconsulta']);
    } else if (tabLabel === 'Cadastro') {
      // Evitar redirecionamento se estiver editando um cliente específico
      if (this.clienteId) {
        this.router.navigate(['/frmclientescadastro', this.clienteId]);
      } else {
        this.router.navigate(['/frmclientescadastro']);
      }
    }
  }
}
