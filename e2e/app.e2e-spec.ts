import { HelpPage } from './app.po';

describe('help App', () => {
  let page: HelpPage;

  beforeEach(() => {
    page = new HelpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
