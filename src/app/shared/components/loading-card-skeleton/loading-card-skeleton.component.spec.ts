import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCardSkeletonComponent } from './loading-card-skeleton.component';

describe('LoadingCardSkeletonComponent', () => {
  let component: LoadingCardSkeletonComponent;
  let fixture: ComponentFixture<LoadingCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
