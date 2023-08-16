import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationlogoSettingComponent } from './application-logo-setting.component';


describe('ApplicationlogoSettingComponent', () => {
  let component: ApplicationlogoSettingComponent;
  let fixture: ComponentFixture<ApplicationlogoSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationlogoSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationlogoSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
