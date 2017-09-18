const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/audio-attachment
 */
class AudioFbMessage extends FbMessage {
  /**
   * @param {string} url mp3
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
        type: 'audio',
        payload: {
          url: this.url
        }
      }
    };
  }
}

module.exports = AudioFbMessage;
