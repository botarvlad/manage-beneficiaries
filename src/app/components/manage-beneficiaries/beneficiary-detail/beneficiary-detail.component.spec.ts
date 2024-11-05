import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryDetailComponent } from './beneficiary-detail.component';

describe('BeneficiaryDetailComponent', () => {
  let component: BeneficiaryDetailComponent;
  let fixture: ComponentFixture<BeneficiaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
