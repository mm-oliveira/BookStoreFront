import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBookRegisterComponent } from './rent-register.component';

describe('RegisterComponent', () => {
  let component: RentBookRegisterComponent;
  let fixture: ComponentFixture<RentBookRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentBookRegisterComponent]
    });
    fixture = TestBed.createComponent(RentBookRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
