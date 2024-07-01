import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProdutosConsultaComponent } from './frm-produtos-consulta.component';

describe('FrmProdutosConsultaComponent', () => {
  let component: FrmProdutosConsultaComponent;
  let fixture: ComponentFixture<FrmProdutosConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmProdutosConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmProdutosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
