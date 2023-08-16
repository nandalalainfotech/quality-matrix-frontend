import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinemasterComponent } from './machinemaster.component';

describe('MachinemasterComponent', () => {
  let component: MachinemasterComponent;
  let fixture: ComponentFixture<MachinemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
