import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainChartsComponent } from './rain-charts.component';

describe('RainChartsComponent', () => {
  let component: RainChartsComponent;
  let fixture: ComponentFixture<RainChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
