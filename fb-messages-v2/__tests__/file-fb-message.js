/* eslint-env jest */
const FileFbMessage = require('../file-fb-message');

describe('FileFbMessage', () => {
  it('should validate constructor args', () => {
    expect(() => new FileFbMessage()).toThrow();
    expect(() => new FileFbMessage(5)).toThrow();
    expect(() => new FileFbMessage('')).toThrow();
    expect(() => new FileFbMessage('http://example.com/file.pdf')).not.toThrow();
  });

  it('should have a render() method', () => {
    const msg = new FileFbMessage('http://example.com/file.pdf');
    expect(typeof msg.render).toBe('function');
  });

  describe('render()', () => {
    it('should return format as expected by Facebook', () => {
      const rendered = new FileFbMessage('http://example.com/file.pdf').render();
      const expected = {attachment: {type: 'file', payload: {url: 'http://example.com/file.pdf'}}};
      expect(rendered).toEqual(expected);
    });
  });
});
