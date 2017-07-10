class FacebookMessage {

  constructor() {
    this.quickReplies = [];
  }

  /**
   * Add a quick reply option to this message.
   *
   * @param title the body of the quick reply
   * @param payload the hidden payload
   */
  addQuickReply(title = '', payload = '') {
    if (!title) {
      throw new Error('parameter `title` is required');
    }

    if (!payload) {
      throw new Error('parameter `payload` is required');
    }

    if (this.quickReplies.length >= 10) {
      throw new Error('there can not be more than 10 quick replies');
    }

    // validation passed
    this.quickReplies.push({
      content_type: 'title',
      title: title.substr(0, 80),
      payload: payload.substr(0, 1000),
    });

    return this;
  }

}

module.exports = FacebookMessage;
