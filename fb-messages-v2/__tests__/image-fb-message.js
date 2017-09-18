/* eslint-env jest */
const ImageFbMessage = require('../image-fb-message');

describe('ImageFbMessage', () => {
  it('should validate constructor args', () => {
    expect(() => new ImageFbMessage()).toThrow();
    expect(() => new ImageFbMessage(5)).toThrow();
    expect(() => new ImageFbMessage('')).toThrow();
    expect(() => new ImageFbMessage('http://example.com/image.jpg')).not.toThrow();
  });

  it('should have a render() method', () => {
    const msg = new ImageFbMessage('http://example.com/image.jpg');
    expect(typeof msg.render).toBe('function');
  });

  describe('render()', () => {
    it('should return format as expected by Facebook', () => {
      const rendered = new ImageFbMessage('http://example.com/image.jpg').render();
      const expected = {attachment: {type: 'image', payload: {url: 'http://example.com/image.jpg'}}};
      expect(rendered).toEqual(expected);
    });
  });
});
