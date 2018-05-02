import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreOrdersComponent } from './view-store-orders.component';

describe('ViewStoreOrdersComponent', () => {
  let component: ViewStoreOrdersComponent;
  let fixture: ComponentFixture<ViewStoreOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
