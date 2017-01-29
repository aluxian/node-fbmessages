const isUrl = require('is-url');

const FacebookMessage = require('./FacebookMessage');

class GenericMessage extends FacebookMessage {

  constructor() {
    super();
    this.bubbles = [];
  }

  get() {
    if (!this.bubbles || !this.bubbles.length) {
      throw new Error('there are no bubbles to create a generic message');
    }

    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: this.bubbles,
        },
      },
    };
  }

  getLastBubble() {
    if (!this.bubbles || !this.bubbles.length) {
      throw new Error('add at least one bubble');
    }

    return this.bubbles[this.bubbles.length - 1];
  }

  addBubble(title, subtitle) {
    if (this.bubbles.length === 10) {
      throw new Error('too many bubbles: 10 is the maximum');
    }

    if (!title) {
      throw new Error('bubble title cannot be empty');
    }

    if (title.length > 80) {
      throw new Error('bubble title cannot be longer than 80 characters');
    }

    if (subtitle && subtitle.length > 80) {
      throw new Error('bubble subtitle cannot be longer than 80 characters');
    }

    const bubble = {
      title: title,
      subtitle: subtitle,
    };

    this.bubbles.push(bubble);
    return this;
  }

  addUrl(url) {
    if (!url) {
      throw new Error('URL is required');
    }

    if (!isUrl(url)) {
      throw new Error('URL needs to be valid');
    }

    this.getLastBubble().item_url = url;
    return this;
  }

  addImage(url) {
    if (!url) {
      throw new Error('image URL is required');
    }

    if (!isUrl(url)) {
      throw new Error('image URL needs to be valid');
    }

    this.getLastBubble().image_url = url;
    return this;
  }

  addButton(title, value) {
    const bubble = this.getLastBubble();
    bubble.buttons = bubble.buttons || [];

    if (bubble.buttons.length === 3) {
      throw new Error('too many buttons: 3 is the maximum');
    }

    if (!title) {
      throw new Error('button title cannot be empty');
    }

    if (!value) {
      throw new Error('button value is required');
    }

    const button = {
      title: title,
    };

    if (isUrl(value)) {
      button.type = 'web_url';
      button.url = value;
    } else {
      button.type = 'postback';
      button.payload = value;
    }

    bubble.buttons.push(button);
    return this;
  }

}

module.exports = GenericMessage;
