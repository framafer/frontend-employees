import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFirebaseComponent } from './employee-firebase.component';

describe('EmployeeFirebaseComponent', () => {
  let component: EmployeeFirebaseComponent;
  let fixture: ComponentFixture<EmployeeFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFirebaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
