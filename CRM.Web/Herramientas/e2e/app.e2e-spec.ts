import { HerramientasPage } from './app.po';

describe('herramientas App', () => {
  let page: HerramientasPage;

  beforeEach(() => {
    page = new HerramientasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
