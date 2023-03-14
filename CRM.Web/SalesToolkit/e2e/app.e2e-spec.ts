import { SalesToolkitPage } from './app.po';

describe('sales-toolkit App', () => {
  let page: SalesToolkitPage;

  beforeEach(() => {
    page = new SalesToolkitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
