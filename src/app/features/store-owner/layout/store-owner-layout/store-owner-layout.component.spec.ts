import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnerLayoutComponent } from './store-owner-layout.component';

describe('StoreOwnerLayoutComponent', () => {
  let component: StoreOwnerLayoutComponent;
  let fixture: ComponentFixture<StoreOwnerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreOwnerLayoutComponent]
    });
    fixture = TestBed.createComponent(StoreOwnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
