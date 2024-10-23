import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenteactionComponent } from './attenteaction.component';

describe('AttenteactionComponent', () => {
  let component: AttenteactionComponent;
  let fixture: ComponentFixture<AttenteactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttenteactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttenteactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
