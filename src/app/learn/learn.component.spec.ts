import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnComponent } from './learn.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LearnService } from './learn.service';
import { Observable, of } from 'rxjs';

describe('LearnComponent', () => {
  let component: LearnComponent;
  let fixture: ComponentFixture<LearnComponent>;
  let learnService: LearnService;
  let spy: jasmine.Spy;
  let mockResponse;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnComponent ],
      imports: [HttpClientModule],
      providers: [LearnService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnComponent);
    component = fixture.componentInstance;
    learnService = fixture.debugElement.injector.get(LearnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LearnService', () => {
    mockResponse = 'Some Page Content';
    spy = spyOn(learnService, 'getPageContent').and.returnValue(of(mockResponse));

    component.getPageContent('someTopic');
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set pageContent', () => {
    mockResponse = 'Some Page Content';
    spy = spyOn(learnService, 'getPageContent').and.returnValue(of(mockResponse));

    component.getPageContent('someTopic');
    expect(component.pageContent).toEqual(mockResponse);
  });

  it('should give an error', () => {
    mockResponse = false;
    spy = spyOn(learnService, 'isTopicExists').and.returnValue(of(mockResponse));

    component.subscribe();
    expect(component.error).toEqual('No data found by given Tpoic.');
  });

  it('should set pages', () => {
    mockResponse = ['Football', 'Football (ball)'];
    spy = spyOn(learnService, 'getPages').and.returnValue(of(mockResponse));
    (<HTMLInputElement>document.getElementById('topic')).value = 'Football';
    spy = spyOn(learnService, 'isTopicExists').and.returnValue(of(true));
    component.subscribe();
    expect(component.allTitles).toEqual(mockResponse);
  });
});
