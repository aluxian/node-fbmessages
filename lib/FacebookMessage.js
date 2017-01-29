class FacebookMessage {

  constructor() {
    this.quickReplies = [];
  }

  /**
   * Add a quick reply option to this message.
   *
   * @param text the body of the quick reply
   * @param payload the hidden payload
   */
  addQuickReply(text, payload) {
    if (!text) {
      throw new Error('parameter `text` is required');
    }

    if (!payload) {
      throw new Error('parameter `payload` is required');
    }

    if (payload.length > 1000) {
      throw new Error('`payload` can not be more than 1000 characters long');
    }

    if (this.quickReplies.length >= 10) {
      throw new Error('there can not be more than 10 quick replies');
    }

    // validation passed
    this.quickReplies.push({
      content_type: 'text',
      title: text,
      payload: payload,
    });

    return this;
  }

  /**
   * Build this message.
   */
  get() {
    throw new Error('not implemented');
  }

}

module.exports = FacebookMessage;
