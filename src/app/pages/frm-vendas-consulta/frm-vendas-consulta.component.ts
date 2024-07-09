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

export interface Vendas {
  vendas_Id: number; // Ajuste para corresponder ao nome na API
  nf: string;
  clienteId: number;
  valorDeVenda: number;
  produtos_Nome: string;
  produtos_Id: number;
  numero_Pedido: number;
}

@Component({
  selector: 'app-frm-vendas-consulta',
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
  templateUrl: './frm-vendas-consulta.component.html',
  styleUrls: ['./frm-vendas-consulta.component.css']
})
export class FrmVendasConsultaComponent implements OnInit {
  displayedColumns: string[] = ['vendas_Id', 'nf', 'clienteId', 'valorDeVenda', 'produtos_Nome', 'produtos_Id', 'numero_Pedido']; // Ajuste para corresponder aos nomes na interface
  dataSource = new MatTableDataSource<Vendas>();
  filtroNome: string = '';
  vendasSelecionada: Vendas | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    this.http.get<Vendas[]>('https://localhost:7219/api/vendas')
      .subscribe((data: Vendas[]) => {
        console.log('Dados carregados:', data); // Verifique se os dados são carregados corretamente
        this.dataSource.data = data;
      }, error => {
        console.error('Erro ao carregar vendas', error);
      });
  }

  aplicarFiltro(): void {
    this.dataSource.filterPredicate = (data: Vendas, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return data.numero_Pedido.toString().includes(searchTerm);
    };

    this.dataSource.filter = this.filtroNome.trim().toLowerCase();
  }

  limparFiltro(): void {
    this.filtroNome = '';
    this.dataSource.filter = '';
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmvendasconsulta']);
    } else if (tabLabel === 'Novo Pedido') {
      this.router.navigate(['/frmvendasnova']);
    }
  }

  selecionarRegistro(registro: Vendas): void {
    this.vendasSelecionada = registro;
    // Implemente a lógica de ação ao selecionar, se necessário
  }

  excluirVendaSelecionada(): void {
    if (this.vendasSelecionada) {
      const id = this.vendasSelecionada.vendas_Id;
      this.http.delete(`https://localhost:7219/api/vendas/${id}`).subscribe(
        () => {
          console.log('Venda excluída com sucesso.');
          this.carregarVendas(); // Recarregar as vendas após a exclusão
        },
        error => {
          console.error('Erro ao excluir a venda:', error);
          // Tratar o erro conforme necessário
        }
      );
    } else {
      console.warn('Nenhuma venda selecionada para excluir.');
    }
  }
}
