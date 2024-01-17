import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TloginComponent } from './tlogin.component';

describe('TloginComponent', () => {
  let component: TloginComponent;
  let fixture: ComponentFixture<TloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TloginComponent]
    });
    fixture = TestBed.createComponent(TloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
