import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorGameComponent } from './actor-game.component';

describe('ActorGameComponent', () => {
  let component: ActorGameComponent;
  let fixture: ComponentFixture<ActorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
