import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistShippinOrderComponent } from './productlist-shippin-order.component';

describe('ProductlistShippinOrderComponent', () => {
  let component: ProductlistShippinOrderComponent;
  let fixture: ComponentFixture<ProductlistShippinOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistShippinOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistShippinOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
