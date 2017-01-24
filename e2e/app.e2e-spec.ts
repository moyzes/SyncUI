import { ChannelsUiPage } from './app.po';

describe('channels-ui App', function() {
  let page: ChannelsUiPage;

  beforeEach(() => {
    page = new ChannelsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
