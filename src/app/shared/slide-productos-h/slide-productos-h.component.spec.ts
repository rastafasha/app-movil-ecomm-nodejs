import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideProductosHComponent } from './slide-productos-h.component';

describe('SlideProductosHComponent', () => {
  let component: SlideProductosHComponent;
  let fixture: ComponentFixture<SlideProductosHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideProductosHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideProductosHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
