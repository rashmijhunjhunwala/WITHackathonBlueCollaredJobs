import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByCandidatesComponent } from './near-by-candidates.component';

describe('NearByCandidatesComponent', () => {
  let component: NearByCandidatesComponent;
  let fixture: ComponentFixture<NearByCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearByCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
