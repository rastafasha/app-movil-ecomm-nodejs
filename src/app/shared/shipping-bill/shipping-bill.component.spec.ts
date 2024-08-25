import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingBillComponent } from './shipping-bill.component';

describe('ShippingBillComponent', () => {
  let component: ShippingBillComponent;
  let fixture: ComponentFixture<ShippingBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
