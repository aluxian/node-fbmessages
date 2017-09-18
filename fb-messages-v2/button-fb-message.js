const FbMessage = require('./fb-message');

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
 */
class ButtonFbMessage extends FbMessage {
  /**
   * @param {string} text
   */
  constructor (text) {
    super();

    if (!text) throw new Error('`text` is required');
    if (typeof text !== 'string') throw new TypeError('`text` must be a string');
    if (text > 640) throw new Error('`text` is too long (max 640 chars)');

    this.text = text;
    this.buttons = [];
  }

  /**
   * Add a URL button to this button template. You may add at most 3 buttons (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button
   * @param {string} title button title, 20 character limit
   * @param {string} url the URL to open when the button is tapped; must use HTTPS if messengerExtensions is true
   * @param {string} [height='full'] height ratio of the webview: compact, tall, full
   * @param {boolean} [extensions=false] must be true if using Messenger Extensions
   * @param {string} [fallbackUrl] the URL to use on clients that don't support Messenger Extensions
   * @param {string} [shareButton] set to 'hide' to disable the share button in the webview
   * @return {ButtonFbMessage} this
   */
  addUrlButton (title, url, height = 'full', extensions = false, fallbackUrl, shareButton) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!url) throw new Error('`url` is required');
    if (typeof url !== 'string') throw new TypeError('`url` must be a string');
    if (!['compact', 'tall', 'full'].includes(height)) throw new Error('`height` must be one of: compact, tall, full');
    if (typeof extensions !== 'boolean') throw new TypeError('`extensions` must be a boolean');
    if (fallbackUrl && typeof url !== 'string') throw new TypeError('`fallbackUrl` must be a string');
    if (shareButton && typeof url !== 'string') throw new TypeError('`shareButton` must be a string');
    if (this.buttons.length >= 3) throw new Error('too many buttons (the maximum is 3)');

    this.buttons.push({
      type: 'web_url',
      url: url,
      title: title,
      webview_height_ratio: height,
      messenger_extensions: extensions,
      fallback_url: fallbackUrl,
      webview_share_button: shareButton
    });

    return this;
  }

  /**
   * Add a postback button to this button template. You may add at most 3 buttons (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/postback-button
   * @param {string} title button title, 20 character limit
   * @param {string} payload custom data that will be sent back via webhook, 1000 character limit
   * @return {ButtonFbMessage} this
   */
  addPostbackButton (title, payload) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!payload) throw new Error('`payload` is required');
    if (typeof payload !== 'string') throw new TypeError('`payload` must be a string');
    if (payload.length > 1000) throw new TypeError('`payload` is too long (max 1000 chars)');

    this.buttons.push({
      type: 'postback',
      title: title,
      payload: payload
    });

    return this;
  }

  /**
   * Add a call button to this button template. You may add at most 3 buttons (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button
   * @param {string} title button title, 20 character limit
   * @param {string} phoneNumber format must have "+" prefix followed by the country code, area code and local number
   * @return {ButtonFbMessage} this
   */
  addCallButton (title, phoneNumber) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!phoneNumber) throw new Error('`phoneNumber` is required');
    if (typeof phoneNumber !== 'string') throw new TypeError('`phoneNumber` must be a string');

    this.buttons.push({
      type: 'phone_number',
      title: title,
      payload: phoneNumber
    });

    return this;
  }

  render () {
    if (this.buttons.length === 0) {
      throw new Error('You must add at least 1 button');
    }
    if (this.buttons.length > 3) {
      throw new Error('You may add at most 3 buttons');
    }

    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: this.text,
          buttons: this.buttons
        }
      }
    };
  }
}

module.exports = ButtonFbMessage;
