// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TelaDeLoginComponent } from './pages/tela-de-login/tela-de-login.component';
import { FrmprincComponent } from './pages/frmprinc/frmprinc.component';
import { FrmFornecedoresCadastroComponent } from './pages/frm-fornecedores-cadastro/frm-fornecedores-cadastro.component';
import { FrmFornecedoresConsultaComponent } from './pages/frm-fornecedores-consulta/frm-fornecedores-consulta.component';
import { FrmProdutosCadastroComponent } from './pages/frm-produtos-cadastro/frm-produtos-cadastro.component';
import { FrmProdutosConsultaComponent } from './pages/frm-produtos-consulta/frm-produtos-consulta.component';
import { AuthGuard } from './auth.guard'; // Importar o AuthGuard
import { FrmClientesCadastroComponent } from './pages/frm-clientes-cadastro/frm-clientes-cadastro.component';
import { FrmClientesConsultaComponent } from './pages/frm-clientes-consulta/frm-clientes-consulta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/frmfornecedoresconsulta', pathMatch: 'full' },
  { path: 'login', component: TelaDeLoginComponent },
  { path: 'frmprinc', component: FrmprincComponent, canActivate: [AuthGuard] },
  { path: 'frmfornecedorescadastro', component: FrmFornecedoresCadastroComponent, canActivate: [AuthGuard] },
  { path: 'frmfornecedoresconsulta', component: FrmFornecedoresConsultaComponent, canActivate: [AuthGuard] },
  { path: 'frmfornecedorescadastro/:id', component: FrmFornecedoresCadastroComponent, canActivate: [AuthGuard] },
  { path: 'frmprodutoscadastro', component: FrmProdutosCadastroComponent, canActivate: [AuthGuard] },
  { path: 'frmprodutosconsulta', component: FrmProdutosConsultaComponent, canActivate: [AuthGuard] },
  { path: 'frmclientescadastro', component: FrmClientesCadastroComponent, canActivate: [AuthGuard] },
  { path: 'frmclientesconsulta', component: FrmClientesConsultaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/frmfornecedoresconsulta' }
];
