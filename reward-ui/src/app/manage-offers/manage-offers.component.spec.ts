import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOffersComponent } from './manage-offers.component';

describe('ManageOffersComponent', () => {
  let component: ManageOffersComponent;
  let fixture: ComponentFixture<ManageOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOffersComponent]
    });
    fixture = TestBed.createComponent(ManageOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
