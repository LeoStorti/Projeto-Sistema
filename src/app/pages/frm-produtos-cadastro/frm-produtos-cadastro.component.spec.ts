import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProdutosCadastroComponent } from './frm-produtos-cadastro.component';

describe('FrmProdutosCadastroComponent', () => {
  let component: FrmProdutosCadastroComponent;
  let fixture: ComponentFixture<FrmProdutosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmProdutosCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmProdutosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
