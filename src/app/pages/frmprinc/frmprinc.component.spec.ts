import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmprincComponent } from './frmprinc.component';

describe('FrmprincComponent', () => {
  let component: FrmprincComponent;
  let fixture: ComponentFixture<FrmprincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmprincComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmprincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
