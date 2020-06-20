import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LearnService {
    
    private baseUrl = 'https://localhost:44395/api/onetime/';
    // Receive messages from server within <interval> seconds.
    private readonly interval = 5;
    private hubConnection: signalR.HubConnection;

    public availablePages: string[];
    
    constructor (private http:HttpClient) { }
    
    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44395/broadcast')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    // Receive from server
    public addBroadcastPageTitleListner = () => {
        this.hubConnection.on('broadcastPageTitle', (data) => {
            this.availablePages.push(data);
        });
    }
    
    // Send to server
    public broadcastPageTitle = (topic) => {
        this.hubConnection.invoke('broadcastPageTitle', topic, this.interval)
        .catch(err => console.error(err));
    }
    
    // Get Page Content
    public getPageContent(title):Observable<any> {
        var requestOptions:Object = {
            responseType: 'text'
        }
        return this.http.get<any>(`${this.baseUrl}getPageByTitle?title=${title}&format=html`, requestOptions);
    }

    // Check if topic exists
    public isTopicExists(topic):Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}isTopicExists?topic=${topic}`);
    }

    // Get list of pages by Topic
    public getPages(topic):Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}getPages?topic=${topic}`);
    }
}