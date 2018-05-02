import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwedComponent } from './view-owed.component';

describe('ViewOwedComponent', () => {
  let component: ViewOwedComponent;
  let fixture: ComponentFixture<ViewOwedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
