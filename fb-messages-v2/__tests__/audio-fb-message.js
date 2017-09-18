/* eslint-env jest */
const AudioFbMessage = require('../audio-fb-message');

describe('AudioFbMessage', () => {
  it('should validate constructor args', () => {
    expect(() => new AudioFbMessage()).toThrow();
    expect(() => new AudioFbMessage(5)).toThrow();
    expect(() => new AudioFbMessage('')).toThrow();
    expect(() => new AudioFbMessage('http://example.com/audio.mp3')).not.toThrow();
  });

  it('should have a render() method', () => {
    const msg = new AudioFbMessage('http://example.com/file.pdf');
    expect(typeof msg.render).toBe('function');
  });

  describe('render()', () => {
    it('should return format as expected by Facebook', () => {
      const rendered = new AudioFbMessage('http://example.com/audio.mp3').render();
      const expected = {attachment: {type: 'audio', payload: {url: 'http://example.com/audio.mp3'}}};
      expect(rendered).toEqual(expected);
    });
  });
});
