import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { HttpClientModule } from '@angular/common/http';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
