import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseentryComponent } from './caseentry.component';

describe('CaseentryComponent', () => {
  let component: CaseentryComponent;
  let fixture: ComponentFixture<CaseentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
