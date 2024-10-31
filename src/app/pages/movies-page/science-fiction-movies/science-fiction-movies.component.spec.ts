import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceFictionMoviesComponent } from './science-fiction-movies.component';

describe('ScienceFictionMoviesComponent', () => {
  let component: ScienceFictionMoviesComponent;
  let fixture: ComponentFixture<ScienceFictionMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScienceFictionMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScienceFictionMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
