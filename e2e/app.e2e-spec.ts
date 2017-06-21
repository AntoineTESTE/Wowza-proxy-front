import { FrontProxyPage } from './app.po';

describe('front-proxy App', () => {
  let page: FrontProxyPage;

  beforeEach(() => {
    page = new FrontProxyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
