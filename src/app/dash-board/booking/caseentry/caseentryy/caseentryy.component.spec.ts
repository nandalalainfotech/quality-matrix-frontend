import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseentryyComponent } from './caseentryy.component';

describe('CaseentryyComponent', () => {
  let component: CaseentryyComponent;
  let fixture: ComponentFixture<CaseentryyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseentryyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseentryyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
