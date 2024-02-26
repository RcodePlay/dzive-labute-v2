import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TloginComponent } from './tlogin.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('TloginComponent', () => {
  let component: TloginComponent;
  let fixture: ComponentFixture<TloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
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
