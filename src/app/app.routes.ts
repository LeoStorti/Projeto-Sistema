import { Routes } from '@angular/router';
import { TelaDeLoginComponent } from './pages/tela-de-login/tela-de-login.component';
import { FrmprincComponent } from './pages/frmprinc/frmprinc.component';
import { FrmFornecedoresCadastroComponent } from './pages/frm-fornecedores-cadastro/frm-fornecedores-cadastro.component';
import { FrmFornecedoresConsultaComponent } from './pages/frm-fornecedores-consulta/frm-fornecedores-consulta.component';
import { FrmProdutosCadastroComponent } from './pages/frm-produtos-cadastro/frm-produtos-cadastro.component';
import { FrmProdutosConsultaComponent } from './pages/frm-produtos-consulta/frm-produtos-consulta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/frmfornecedoresconsulta', pathMatch: 'full' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'frmprinc', component: FrmprincComponent },
  { path: 'frmfornecedorescadastro', component: FrmFornecedoresCadastroComponent },
  { path: 'frmfornecedoresconsulta', component: FrmFornecedoresConsultaComponent },
  { path: 'frmfornecedorescadastro/:id', component: FrmFornecedoresCadastroComponent },// Verificar
  { path: 'frmprodutoscadastro', component: FrmProdutosCadastroComponent },
  { path: 'frmprodutosconsulta', component: FrmProdutosConsultaComponent },
  { path: '**', redirectTo: '/frmfornecedoresconsulta' }
];
