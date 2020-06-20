import { TestBed, inject } from '@angular/core/testing'
import { LearnService } from './learn.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpResponse } from '@angular/common/http';

const baseUrl = 'https://localhost:44395/api/onetime/';

describe('LearnService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LearnService, HttpClient]
        });
    });

    it('should be created', inject([LearnService], (service: LearnService) => {
        expect(service).toBeTruthy();
    }));
    
    it('should check topic existence and return true', inject([LearnService, HttpTestingController], (service: LearnService, backend: HttpTestingController) => {
        var topic = 'Football';
        var mockResponse = true;

        service.isTopicExists(topic)
            .subscribe(isTopicExists => {
                expect(isTopicExists).toEqual(mockResponse);
            });

        backend.expectOne({
            method: 'GET',
            url: `${baseUrl}isTopicExists?topic=${topic}`
        }).event(new HttpResponse<boolean>({body: mockResponse}));
    }));

    it('should check topic existence and return false', inject([LearnService, HttpTestingController], (service: LearnService, backend: HttpTestingController) => {
        var topic = 'Football';
        var mockResponse = false;

        service.isTopicExists(topic)
            .subscribe(isTopicExists => {
                expect(isTopicExists).toEqual(mockResponse);
            });

        backend.expectOne({
            method: 'GET',
            url: `${baseUrl}isTopicExists?topic=${topic}`
        }).event(new HttpResponse<boolean>({body: mockResponse}));
    }));
    
    it('should get pages by topic', inject([LearnService, HttpTestingController], (service: LearnService, backend: HttpTestingController) => {
        var topic = 'Football';
        var mockResponse = ['Football', 'Football (ball)'];
        service.getPages(topic)
            .subscribe(pages => {
                expect(pages).toEqual(mockResponse);
            });
        backend.expectOne({
            method: 'GET',
            url: `${baseUrl}getPages?topic=${topic}`
        }).flush(mockResponse)
    }));
});