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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService, Clientes } from '../../services/clientes.service';

export interface Vendas {
  vendas_Id: number;
  nf: string;
  clienteId: number;
  valorDeVenda: string;
  produtos_Nome: string;
  produtos_Id: string;
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
  displayedColumns: string[] = ['clienteId', 'nomeCliente', 'cnpjCliente', 'enderecoCliente','telefoneCliente'];
  dataSource = new MatTableDataSource<Vendas>();
  venda: Vendas = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos_Nome: '', produtos_Id: '', numero_Pedido: '' };
  activeTabIndex = 1;
  clientes: Clientes[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeTabIndex = 1;
    });
    this.carregarTodasVendas();
    this.carregarClientes();
  }

  carregarTodasVendas(): void {
    this.http.get<Vendas[]>('https://localhost:7219/api/vendas').subscribe((data: Vendas[]) => {
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

  salvarVenda(): void {
    this.http.post('https://localhost:7219/api/vendas', this.venda).subscribe(response => {
      this.carregarTodasVendas();
      this.cancelar();
    }, error => {
      console.error('Erro ao salvar venda', error);
    });
  }

  cancelar(): void {
    this.venda = { vendas_Id: 0, nf: '', clienteId: 0, valorDeVenda: '', produtos_Nome: '', produtos_Id: '', numero_Pedido: '' };
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
