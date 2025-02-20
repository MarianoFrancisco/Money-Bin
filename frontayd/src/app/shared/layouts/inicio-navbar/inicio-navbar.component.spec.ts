import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioNavbarComponent } from './inicio-navbar.component';

describe('InicioNavbarComponent', () => {
  let component: InicioNavbarComponent;
  let fixture: ComponentFixture<InicioNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
