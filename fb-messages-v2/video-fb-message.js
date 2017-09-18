const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/video-attachment
 */
class VideoFbMessage extends FbMessage {
  /**
   * @param {string} url mp4
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
        type: 'video',
        payload: {
          url: this.url
        }
      }
    };
  }
}

module.exports = VideoFbMessage;
