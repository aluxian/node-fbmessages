/* eslint-env jest */
const TextFbMessage = require('../text-fb-message');

describe('TextFbMessage', () => {
  it('should validate constructor args', () => {
    expect(() => new TextFbMessage()).toThrow();
    expect(() => new TextFbMessage(5)).toThrow();
    expect(() => new TextFbMessage('')).toThrow();
    expect(() => new TextFbMessage('hello')).not.toThrow();
  });

  it('should have a render() method', () => {
    const msg = new TextFbMessage('hello');
    expect(typeof msg.render).toBe('function');
  });

  describe('render()', () => {
    it('should return format as expected by Facebook (no quick replies)', () => {
      const rendered = new TextFbMessage('hello').render();
      expect(rendered.text).toEqual('hello');
      expect(rendered.quick_replies).toBeUndefined();
    });

    it('should return format as expected by Facebook (with quick replies)', () => {
      const msg = new TextFbMessage('hello');
      msg.addTextQuickReply('How are you?', 'HELLO_RESP', 'http://example.com/image.jpg');

      const rendered = msg.render();
      const expected = {
        text: 'hello',
        quick_replies: [{
          content_type: 'text',
          title: 'How are you?',
          payload: 'HELLO_RESP',
          image_url: 'http://example.com/image.jpg'
        }]
      };

      expect(rendered).toEqual(expected);
    });
  });
});
