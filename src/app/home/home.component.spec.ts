import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers:[]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  it('should render', () => {
    expect(component).toBeTruthy()
  });
  
});
