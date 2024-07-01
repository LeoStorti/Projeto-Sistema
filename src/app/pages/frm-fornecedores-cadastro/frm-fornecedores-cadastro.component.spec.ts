import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFornecedoresCadastroComponent } from './frm-fornecedores-cadastro.component';

describe('FrmFornecedoresCadastroComponent', () => {
  let component: FrmFornecedoresCadastroComponent;
  let fixture: ComponentFixture<FrmFornecedoresCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmFornecedoresCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmFornecedoresCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
