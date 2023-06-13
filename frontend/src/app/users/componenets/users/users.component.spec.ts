import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponenet } from './users.component';

describe('UsersComponenet', () => {
  let component: UsersComponenet;
  let fixture: ComponentFixture<UsersComponenet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponenet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
