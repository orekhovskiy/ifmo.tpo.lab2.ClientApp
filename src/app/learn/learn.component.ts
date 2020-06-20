import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import {LearnService} from './learn.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
  providers: [LearnService]
})
export class LearnComponent implements OnInit {

  public topic: string;
  public allTitles: string[];
  public currentTitle: string;
  public error: string;
  public pageContent: string;
  

  constructor(private learnService: LearnService) { }

  ngOnInit(): void {
    this.learnService.startConnection();
    this.learnService.addBroadcastPageTitleListner();
    this.pageContent = 'Find a topic to learn a cool content!';
    this.topic = 'Learn a topic';
    this.allTitles = [];
    this.learnService.availablePages = [];
    this.currentTitle = 'Learn a page';
  }

  getPageContent(title:string):void {
    this.currentTitle = title;
    this.learnService.getPageContent(title)
      .subscribe( (content) => {
        document.getElementById('pageContent').innerHTML = content;
        this.pageContent = content;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  isPageAvailable(title):boolean {
    return this.learnService.availablePages.includes(title);
  }
  
  subscribe():void {
    var topic:string = (<HTMLInputElement>document.getElementById('topic')).value;
    document.getElementById('pageContent').innerHTML = 'Find a topic to learn a cool content!';
    this.learnService.availablePages = [];
    this.allTitles = [];
    this.error='';
    this.learnService.isTopicExists(topic)
      .subscribe((isTopicExists) => {
        if (isTopicExists) {
          this.learnService.broadcastPageTitle(topic);
          this.topic = topic;
          this.learnService.getPages(topic)
            .subscribe((titles) => {
              this.allTitles = titles;
            });
        }
        else {
          this.error='No data found by given Tpoic.';
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
}
