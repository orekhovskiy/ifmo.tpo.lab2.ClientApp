import { AppPage } from './app.po';
import { browser, logging, element, by, until } from 'protractor';

describe('workspace-project App', async () => {
  let page: AppPage;
  let trueTopics = ['Football', 'Physics'];
  let fakeTopic = 'Бяка всякая';
  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('About');
  });

  it('should have 2 seconds interval by default', () => {
    page.navigateTo();
    var intervalSelect = element(by.id('interval'));
    expect(intervalSelect.getAttribute('value')).toEqual('2');
  });

  it('should be able to change the select value', () => {
    page.navigateTo();
    var intervalSelect = element(by.id('interval'));
    expect(intervalSelect.getAttribute('value')).toEqual('2');
    element(by.css("#interval [value='60']")).click();
    expect(intervalSelect.getAttribute('value')).toEqual('60');
    element(by.css("#interval [value='3600']")).click();
    expect(intervalSelect.getAttribute('value')).toEqual('3600');
  });

  it('should route to the learn page via anchor', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('About');
    element(by.id('learnAnchor')).click();
    expect(browser.getTitle()).toEqual('Learn');
  });

  it('should route to the learn page via nav-link', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('About');
    element(by.id('LearnNavLink')).click()
      .then(() => {
        expect(browser.driver.getTitle()).toEqual('Learn');
      });
  });

  it('should find a topic', () => {
    page.navigateToLearnPage().then(() => {
      expect(browser.driver.getTitle()).toEqual('Learn');
      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(trueTopics[0]);
      expect(topic.getAttribute('value')).toEqual(trueTopics[0]);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementLocated(by.id('topicHeader')));
          var topicHeader = browser.driver.findElement(by.id('topicHeader'));
          expect(topicHeader.getText()).toEqual(trueTopics[0]);
        });

    })
  });

  it('should show an error when the topic is wrong', () => {
    page.navigateToLearnPage().then(() => {      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(fakeTopic);
      expect(topic.getAttribute('value')).toEqual(fakeTopic);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementLocated(by.id('error')));
          var error = browser.driver.findElement(by.id('error'));
          expect(error.getText()).toEqual('No data found by given topic.');
        });      
    });
  });

  it('should load a page', () => {
    page.navigateToLearnPage().then(() => {
      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(trueTopics[0]);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementsLocated(by.css('.btn-primary')));
          var titleButtons = browser.driver.findElements(by.css('.btn-primary'));
          titleButtons.then((titles: any[]) => {
            titles[0].click().then(()=> {
              browser.driver.wait(until.elementLocated(by.id('currentTitle')));
              var currentTitle = browser.driver.findElement(by.id('currentTitle'));
              expect(currentTitle.getText()).toBeDefined();
            });
          });
        });
    });
  });

  it('should receive titles from hub within 2 seconds by default', () => {
    page.navigateToLearnPage().then(() => {
      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(trueTopics[0]);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementsLocated(by.css('.btn-primary')));
          browser.driver.sleep(6000);
          var titleButtons = browser.driver.findElements(by.css('.btn-primary'));
          titleButtons.then((titles: any[]) => {
            expect(titles.length).toBeGreaterThan(1);
          });
        });
    });
  });

  it('should receive titles from hub with interval different from 2', () => {
    page.navigateTo();
    element(by.css("#interval [value='60']")).click();

    page.navigateToLearnPage().then(() => {
      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(trueTopics[0]);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementsLocated(by.css('.btn-primary')));
          browser.driver.sleep(6000);
          var titleButtons = browser.driver.findElements(by.css('.btn-primary'));
          titleButtons.then((titles: any[]) => {
            expect(titles.length).toEqual(1);
          });
        });
    });
  });

  it ('should hide an error when new given topic is correct', () => {
    page.navigateToLearnPage().then(() => {      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(fakeTopic);
      expect(topic.getAttribute('value')).toEqual(fakeTopic);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementLocated(by.id('error')));
          var error = browser.driver.findElement(by.id('error'));
          expect(error.getText()).toEqual('No data found by given topic.');
        }).then(() => {
          topic.clear();
          topic.sendKeys(trueTopics[0]);
          expect(topic.getAttribute('value')).toEqual(trueTopics[0]);
          searchButton.click()
            .then(() => {
              browser.driver.findElements(by.id('error')).then((items) => {
                expect(items.length).toBe(0);
              });
            });
        });      
    });
  });

  it ('should remove old topic and page when new topic is given', () => {
    page.navigateToLearnPage().then(() => {
      
      var topic = browser.driver.findElement(by.id('topic'));
      var searchButton = browser.driver.findElement(by.id('searchButton'));

      topic.sendKeys(trueTopics[0]);

      searchButton.click()
        .then(() => {
          browser.driver.wait(until.elementsLocated(by.css('.btn-primary')));
          var titleButtons = browser.driver.findElements(by.css('.btn-primary'));
          titleButtons.then((titles: any[]) => {
            titles[0].click().then(()=> {
              browser.driver.wait(until.elementLocated(by.id('currentTitle')));
              var currentTitle = browser.driver.findElement(by.id('currentTitle'));
              expect(currentTitle.getText()).toBeDefined();
            });
          });

          topic.clear();
          topic.sendKeys(trueTopics[1]);
          expect(topic.getAttribute('value')).toEqual(trueTopics[1]);
          searchButton.click()
            .then(() => {
              browser.driver.wait(until.elementTextContains(browser.driver.findElement(by.id('topicHeader')), trueTopics[1]));
              var topicHeader = browser.driver.findElement(by.id('topicHeader'));
              expect(topicHeader.getText()).toEqual(trueTopics[1]);

              browser.driver.findElements(by.id('currentTitle')).then((items) => {
                expect(items.length).toBe(0);
              });
            });
        });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
