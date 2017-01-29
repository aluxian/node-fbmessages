const FacebookMessage = require('./FacebookMessage');

class TextMessage extends FacebookMessage {

  constructor(text = '') {
    super();

    if (!text) {
      throw new Error('parameter `text` is required');
    }

    // validation passed
    this.text = text.substr(0, 320);
  }

  get() {
    const reply = {
      text: this.text,
    };

    if (Array.isArray(this.quickReplies) && this.quickReplies.length > 0) {
      reply.quick_replies = this.quickReplies;
    }

    return reply;
  }

}

module.exports = TextMessage;
