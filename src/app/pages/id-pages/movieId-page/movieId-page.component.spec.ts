import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieIdPageComponent } from './movieId-page.component';



describe('FilmPageComponent', () => {
  let component: MovieIdPageComponent;
  let fixture: ComponentFixture<MovieIdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieIdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
