import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponentWrapperComponent } from './auth-component-wrapper.component';

describe('AuthComponentWrapperComponent', () => {
  let component: AuthComponentWrapperComponent;
  let fixture: ComponentFixture<AuthComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
