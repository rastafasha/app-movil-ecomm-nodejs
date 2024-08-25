import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIndexComponent } from './ticket-index.component';

describe('TicketIndexComponent', () => {
  let component: TicketIndexComponent;
  let fixture: ComponentFixture<TicketIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
