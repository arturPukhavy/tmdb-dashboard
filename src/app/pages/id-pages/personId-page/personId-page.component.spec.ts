import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIdPageComponent } from './personId-page.component';

describe('PersonIdPageComponent', () => {
  let component: PersonIdPageComponent;
  let fixture: ComponentFixture<PersonIdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonIdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
