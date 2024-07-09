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

export interface Vendas {
  Vendas_Id: number;
  NF: string;
  ClienteId: string;
  ValorDeVenda: string;
  Produtos_Nome: string;
  Produtos_Id: string;
  Numero_Pedido: string;
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
    CommonModule,
    FormsModule
  ],
  templateUrl: './frm-vendas-nova.component.html',
  styleUrls: ['./frm-vendas-nova.component.css']
})
export class FrmVendasNovaComponent implements OnInit {
  displayedColumns: string[] = ['Vendas_Id', 'NF', 'ClienteId', 'ValorDeVenda', 'Produtos_Nome', 'Produtos_Id', 'Numero_Pedido'];
  dataSource = new MatTableDataSource<Vendas>();
  venda: Vendas = { Vendas_Id: 0, NF: '', ClienteId: '', ValorDeVenda: '', Produtos_Nome: '', Produtos_Id: '', Numero_Pedido: '' };
  activeTabIndex = 1; // Definir a aba ativa como "Cadastro"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Definir a aba ativa com base no parâmetro de rota ou lógica específica
      this.activeTabIndex = 1;
    });
    this.carregarTodasVendas();
  }

  carregarTodasVendas(): void {
    console.log('Carregando todas as vendas'); // Log para verificar a chamada da API
    this.http.get<Vendas[]>(`https://localhost:7219/api/vendas`).subscribe((data: Vendas[]) => {
      console.log('Todas as vendas carregadas:', data); // Log para verificar os dados carregados
      this.dataSource.data = data;
    }, error => {
      console.error('Erro ao carregar todas as vendas', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  salvarVenda(): void {
    console.log('Salvando venda:', this.venda); // Log para verificar os dados a serem salvos
    this.http.post(`https://localhost:7219/api/vendas`, this.venda).subscribe(response => {
      console.log('Venda salva com sucesso:', response); // Log para verificar a resposta da API
      this.carregarTodasVendas(); // Atualizar a lista de vendas após salvar
      this.cancelar(); // Limpar o formulário após salvar
    }, error => {
      console.error('Erro ao salvar venda', error);
      // Adicione qualquer lógica de tratamento de erro aqui, se necessário
    });
  }

  cancelar(): void {
    this.venda = { Vendas_Id: 0, NF: '', ClienteId: '', ValorDeVenda: '', Produtos_Nome: '', Produtos_Id: '', Numero_Pedido: '' };
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
