import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmmailUserComponent} from './change-password.component';

describe('ConfirmmailUserComponent', () => {
  let component: ConfirmmailUserComponent;
  let fixture: ComponentFixture<ConfirmmailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmmailUserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmmailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
