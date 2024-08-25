import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterAdminComponent } from './menu-footer-admin.component';

describe('MenuFooterAdminComponent', () => {
  let component: MenuFooterAdminComponent;
  let fixture: ComponentFixture<MenuFooterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFooterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
