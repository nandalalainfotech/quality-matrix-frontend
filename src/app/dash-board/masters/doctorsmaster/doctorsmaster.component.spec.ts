import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsmasterComponent } from './doctorsmaster.component';

describe('DoctorsmasterComponent', () => {
  let component: DoctorsmasterComponent;
  let fixture: ComponentFixture<DoctorsmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
