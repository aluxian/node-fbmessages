const isUrl = require('is-url');

const FacebookMessage = require('./FacebookMessage');

class ImageMessage extends FacebookMessage {

  constructor(url) {
    super();

    if (!url || !isUrl(url)) {
      throw new Error('parameter `url` is not a valid URL');
    }

    this.url = url;
  }

  get() {
    return {
      attachment: {
        type: 'image',
        payload: {
          url: this.url,
        },
      },
    };
  }

}

module.exports = ImageMessage;
