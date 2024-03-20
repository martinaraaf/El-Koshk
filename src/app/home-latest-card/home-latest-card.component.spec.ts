import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLatestCardComponent } from './home-latest-card.component';

describe('HomeLatestCardComponent', () => {
  let component: HomeLatestCardComponent;
  let fixture: ComponentFixture<HomeLatestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLatestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLatestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
