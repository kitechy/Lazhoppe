import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStoreComponent } from './apply-store.component';

describe('ApplyStoreComponent', () => {
  let component: ApplyStoreComponent;
  let fixture: ComponentFixture<ApplyStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyStoreComponent]
    });
    fixture = TestBed.createComponent(ApplyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
