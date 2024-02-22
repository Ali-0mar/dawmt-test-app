import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorductCardComponent } from './product-card.component';

describe('PorductCardComponent', () => {
  let component: PorductCardComponent;
  let fixture: ComponentFixture<PorductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
