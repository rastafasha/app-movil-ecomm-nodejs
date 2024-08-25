import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupStoreComponent } from './pickup-store.component';

describe('PickupStoreComponent', () => {
  let component: PickupStoreComponent;
  let fixture: ComponentFixture<PickupStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
