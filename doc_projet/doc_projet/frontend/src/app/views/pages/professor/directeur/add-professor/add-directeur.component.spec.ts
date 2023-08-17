import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirecteurComponent } from './add-directeur.component';

describe('AddProfessorComponent', () => {
  let component: AddDirecteurComponent;
  let fixture: ComponentFixture<AddDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDirecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
