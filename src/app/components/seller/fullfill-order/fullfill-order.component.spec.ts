import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullfillOrderComponent } from './fullfill-order.component';

describe('FullfillOrderComponent', () => {
  let component: FullfillOrderComponent;
  let fixture: ComponentFixture<FullfillOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullfillOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullfillOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
