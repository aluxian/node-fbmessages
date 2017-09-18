/* eslint-env jest */
const VideoFbMessage = require('../video-fb-message');

describe('VideoFbMessage', () => {
  it('should validate constructor args', () => {
    expect(() => new VideoFbMessage()).toThrow();
    expect(() => new VideoFbMessage(5)).toThrow();
    expect(() => new VideoFbMessage('')).toThrow();
    expect(() => new VideoFbMessage('http://example.com/video.mp4')).not.toThrow();
  });

  it('should have a render() method', () => {
    const msg = new VideoFbMessage('http://example.com/video.mp4');
    expect(typeof msg.render).toBe('function');
  });

  describe('render()', () => {
    it('should return format as expected by Facebook', () => {
      const rendered = new VideoFbMessage('http://example.com/video.mp4').render();
      const expected = {attachment: {type: 'video', payload: {url: 'http://example.com/video.mp4'}}};
      expect(rendered).toEqual(expected);
    });
  });
});
