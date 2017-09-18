const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/text-message
 */
class TextFbMessage extends FbMessage {
  /**
   * @param {string} text
   */
  constructor (text) {
    super();

    if (!text) throw new Error('`text` is required');
    if (typeof text !== 'string') throw new TypeError('`text` must be a string');
    if (text.length > 640) throw new Error('`text` is too long (max 640 chars)');

    this.text = text;
    this.quickReplies = [];
  }

  /**
   * Add a text quick reply to this message. You may add at most 11 quick replies (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   * @param {string} title caption of the button, at most 20 characters
   * @param {string} payload custom data that will be sent back via webhook, at most 1000 characters
   * @param {string} [imageUrl] URL of image attached to the quick reply
   * @return {TextFbMessage} this
   */
  addTextQuickReply (title, payload, imageUrl) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title.length > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!payload) throw new Error('`payload` is required');
    if (typeof payload !== 'string') throw new TypeError('`payload` must be a string');
    if (payload.length > 1000) throw new TypeError('`payload` is too long (max 1000 chars)');
    if (imageUrl && typeof imageUrl !== 'string') throw new TypeError('`imageUrl` must be a string');
    if (this.quickReplies.length >= 11) throw new Error('too many quick replies (the maximum is 11)');

    this.quickReplies.push({
      content_type: 'text',
      title: title,
      payload: payload,
      image_url: imageUrl
    });

    return this;
  }

  /**
   * Add a 'Send Location' quick reply to this message. You may add at most 11 quick replies (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   * @return {TextFbMessage} this
   */
  addSendLocationQuickReply () {
    this.quickReplies.push({
      content_type: 'location'
    });

    return this;
  }

  render () {
    // quick_replies should either have at least 1 element or be undefined
    const quickReplies = (this.quickReplies || []).length > 0 ? this.quickReplies : undefined;

    return {
      text: this.text,
      quick_replies: quickReplies
    };
  }
}

module.exports = TextFbMessage;
