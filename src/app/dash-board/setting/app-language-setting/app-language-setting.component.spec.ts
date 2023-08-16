import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLanguageSettingComponent } from './app-language-setting.component';

describe('AppLanguageSettingComponent', () => {
  let component: AppLanguageSettingComponent;
  let fixture: ComponentFixture<AppLanguageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLanguageSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLanguageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
