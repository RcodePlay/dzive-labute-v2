import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageContentComponent } from './subpage-content.component';

describe('SubpageContentComponent', () => {
  let component: SubpageContentComponent;
  let fixture: ComponentFixture<SubpageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubpageContentComponent]
    });
    fixture = TestBed.createComponent(SubpageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
