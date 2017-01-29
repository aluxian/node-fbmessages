const FacebookMessage = require('./FacebookMessage');

class TextMessage extends FacebookMessage {

  constructor(text) {
    super();

    if (!text) {
      throw new Error('parameter `text` is required');
    }

    if (text.length > 320) {
      throw new Error('`text` is too long');
    }

    // validation passed
    this.text = text;
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
