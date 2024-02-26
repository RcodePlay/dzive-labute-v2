import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageContentComponent } from './subpage-content.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubpageContentComponent', () => {
  let component: SubpageContentComponent;
  let fixture: ComponentFixture<SubpageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
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
