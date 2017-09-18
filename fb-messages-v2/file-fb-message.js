const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/file-attachment
 */
class FileFbMessage extends FbMessage {
  /**
   * @param {string} url
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
        type: 'file',
        payload: {
          url: this.url
        }
      }
    };
  }
}

module.exports = FileFbMessage;
