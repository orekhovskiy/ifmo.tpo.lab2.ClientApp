import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToLearnPage(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/learn') as Promise<unknown>
  }

  getTitleText(): Promise<string> {
    return element(by.css('title')).getText() as Promise<string>;
  }
}
