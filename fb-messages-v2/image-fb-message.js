const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/image-attachment
 */
class ImageFbMessage extends FbMessage {
  /**
   * @param {string} url jpg, png, gif
   */
  constructor (url) {
    super();

    if (!url) throw new Error('`url` is required');
    if (typeof url !== 'string') throw new TypeError('`url` must be a string');

    this.url = url;
  }

  render () {
    return {
      attachment: {
        type: 'image',
        payload: {
          url: this.url
        }
      }
    };
  }
}

module.exports = ImageFbMessage;
