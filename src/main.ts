// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adicionando FormsModule e ReactiveFormsModule

import { TelaDeLoginComponent } from './app/pages/tela-de-login/tela-de-login.component';
import { FrmprincComponent } from './app/pages/frmprinc/frmprinc.component';
import { FrmFornecedoresCadastroComponent } from './app/pages/frm-fornecedores-cadastro/frm-fornecedores-cadastro.component';
import { FrmFornecedoresConsultaComponent } from './app/pages/frm-fornecedores-consulta/frm-fornecedores-consulta.component';
import { FrmProdutosCadastroComponent } from './app/pages/frm-produtos-cadastro/frm-produtos-cadastro.component';
import { FrmProdutosConsultaComponent } from './app/pages/frm-produtos-consulta/frm-produtos-consulta.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: 'login', component: TelaDeLoginComponent },
        { path: 'frmprinc', component: FrmprincComponent },
        { path: 'frmfornecedorescadastro', component: FrmFornecedoresCadastroComponent },
        { path: 'frmfornecedoresconsulta', component: FrmFornecedoresConsultaComponent },
        { path: 'frmprodutoscadastro', component: FrmProdutosCadastroComponent },
        { path: 'frmprodutosconsulta', component: FrmProdutosConsultaComponent },
        { path: '**', redirectTo: 'login' }
      ]),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule // Certifique-se de importar HttpClientModule
    ),
    provideHttpClient(), provideAnimationsAsync(),
  ],
});
