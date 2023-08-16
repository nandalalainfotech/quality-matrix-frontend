import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingentryComponent } from './bookingentry.component';

describe('BookingentryComponent', () => {
  let component: BookingentryComponent;
  let fixture: ComponentFixture<BookingentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
