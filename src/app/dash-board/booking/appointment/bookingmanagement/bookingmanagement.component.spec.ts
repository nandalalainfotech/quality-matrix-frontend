import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingmanagementComponent } from './bookingmanagement.component';

describe('BookingmanagementComponent', () => {
  let component: BookingmanagementComponent;
  let fixture: ComponentFixture<BookingmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
