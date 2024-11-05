import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntitiesTableComponent } from './legal-entities-table.component';

describe('LegalEntitiesTableComponent', () => {
  let component: LegalEntitiesTableComponent;
  let fixture: ComponentFixture<LegalEntitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalEntitiesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalEntitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
