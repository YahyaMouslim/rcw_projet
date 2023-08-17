import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerAuthComponent } from './spinner-auth.component';

describe('SpinnerAuthComponent', () => {
  let component: SpinnerAuthComponent;
  let fixture: ComponentFixture<SpinnerAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
