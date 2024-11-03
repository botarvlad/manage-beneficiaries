import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsTableComponent } from './individuals-table.component';

describe('IndividualsTableComponent', () => {
  let component: IndividualsTableComponent;
  let fixture: ComponentFixture<IndividualsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
