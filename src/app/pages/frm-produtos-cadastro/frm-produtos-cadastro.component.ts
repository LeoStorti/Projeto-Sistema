import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService, Produto } from '../../services/produtos.service';

@Component({
  selector: 'app-frm-produtos-cadastro',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './frm-produtos-cadastro.component.html',
  styleUrls: ['./frm-produtos-cadastro.component.css']
})
export class FrmProdutosCadastroComponent implements OnInit {
    produto: Produto = {
      productId: 0,
      nomeProduto: '',
      fornecedor: '',
      quantidade: 0,
      valorDeVenda: 0,
      valorDeCompra: 0,
      nome: undefined,
      Produto: undefined
    };
  fornecedorId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fornecedorId = +params.get('id')!;
      if (this.fornecedorId) {
        this.carregarProdutosFornecedor(this.fornecedorId);
      }
    });
  }

  carregarProdutosFornecedor(fornecedorId: number): void {
    this.produtosService.getProdutosByFornecedorId(fornecedorId).subscribe(
      (produtos: Produto[]) => {
        this.produto = produtos[0]; // Supondo que há apenas um produto. Ajuste conforme necessário.
      },
      error => {
        console.error('Erro ao carregar produtos do fornecedor', error);
      }
    );
  }

  onTabChange(event: any): void {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmprodutosconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmprodutoscadastro']);
    }
  }

  salvarProduto(): void {
    if (this.produto.productId) {
      // Atualizar produto existente
      this.produtosService.atualizarProduto(this.produto).subscribe(
        response => {
          console.log('Produto atualizado com sucesso', response);
          this.router.navigate(['/frmprodutosconsulta']); // Navegue para a página de consulta após a atualização
        },
        error => {
          console.error('Erro ao atualizar produto', error);
        }
      );
    } else {
      console.log(this.produto);
      // Adicionar novo produto
      this.produtosService.adicionarProduto(this.produto).subscribe(
        response => {
          console.log('Produto adicionado com sucesso', response);
          this.router.navigate(['/frmprodutosconsulta']); // Navegue para a página de consulta após a adição
        },
        error => {
          console.error('Erro ao adicionar produto', error);
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/frmprodutosconsulta']);
  }
}
