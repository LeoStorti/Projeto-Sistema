// src/app/components/frm-produtos-cadastro/frm-produtos-cadastro.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
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
    FormsModule // Add FormsModule
  ],
  templateUrl: './frm-produtos-cadastro.component.html',
  styleUrls: ['./frm-produtos-cadastro.component.css']
})
export class FrmProdutosCadastroComponent {
  produto: Produto = {
    productId: 0,
    nomeProduto: '',
    fornecedor: '',
    quantidade: 0
  };

  constructor(private router: Router, private produtosService: ProdutosService) {}

  onTabChange(event: any) {
    const tabLabel = event.tab.textLabel;
    if (tabLabel === 'Consulta') {
      this.router.navigate(['/frmprodutosconsulta']);
    } else if (tabLabel === 'Cadastro') {
      this.router.navigate(['/frmprodutoscadastro']);
    }
  }

  salvarProduto() {
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

      console.log(this.produto)
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

  cancelar() {
    this.router.navigate(['/frmprodutosconsulta']);
  }
}
