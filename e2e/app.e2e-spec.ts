import { NewHMSPage } from './app.po';

describe('new-hms App', () => {
  let page: NewHMSPage;

  beforeEach(() => {
    page = new NewHMSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
