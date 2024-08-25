import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrdenComponent } from './track-orden.component';

describe('TrackOrdenComponent', () => {
  let component: TrackOrdenComponent;
  let fixture: ComponentFixture<TrackOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
