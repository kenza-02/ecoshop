import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideportailComponent } from './sideportail.component';

describe('SideportailComponent', () => {
  let component: SideportailComponent;
  let fixture: ComponentFixture<SideportailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideportailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideportailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
