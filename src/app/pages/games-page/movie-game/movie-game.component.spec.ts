import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGameComponent } from './movie-game.component';

describe('MovieGameComponent', () => {
  let component: MovieGameComponent;
  let fixture: ComponentFixture<MovieGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
