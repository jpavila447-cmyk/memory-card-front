import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordsComponent } from './admin-passwords.component';

describe('AdminPasswordsComponent', () => {
  let component: AdminPasswordsComponent;
  let fixture: ComponentFixture<AdminPasswordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPasswordsComponent]
    });
    fixture = TestBed.createComponent(AdminPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
