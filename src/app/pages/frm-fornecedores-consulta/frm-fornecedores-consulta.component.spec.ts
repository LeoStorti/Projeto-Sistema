import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFornecedoresConsultaComponent } from './frm-fornecedores-consulta.component';

describe('FrmFornecedoresConsultaComponent', () => {
  let component: FrmFornecedoresConsultaComponent;
  let fixture: ComponentFixture<FrmFornecedoresConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmFornecedoresConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmFornecedoresConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
