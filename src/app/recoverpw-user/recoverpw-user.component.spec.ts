import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecoverpwUserComponent} from './recoverpw-user.component';

describe('RecoverpwUserComponent', () => {
  let component: RecoverpwUserComponent;
  let fixture: ComponentFixture<RecoverpwUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoverpwUserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpwUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
