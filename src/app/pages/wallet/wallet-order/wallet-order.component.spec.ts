import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletOrderComponent } from './wallet-order.component';

describe('WalletOrderComponent', () => {
  let component: WalletOrderComponent;
  let fixture: ComponentFixture<WalletOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
