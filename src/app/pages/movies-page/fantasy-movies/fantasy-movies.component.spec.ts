import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyMoviesComponent } from './fantasy-movies.component';

describe('FantasyMoviesComponent', () => {
  let component: FantasyMoviesComponent;
  let fixture: ComponentFixture<FantasyMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantasyMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
